---
title: How to test Apollo hooks without the "act" warnings?
date: "2019-08-28T20:15:02.600Z"
description: "Have you started using @apollo/react-hooks package but noticed React warnings in your tests? Learn how to get rid of them."
---

You started migrating to [the new version of React Apollo](https://blog.apollographql.com/apollo-client-now-with-react-hooks-676d116eeae2), but noticed strange error messages in your tests:

```text
Warning: An update to Profile inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):
```

There is also a link to [a page providing more information](https://fb.me/react-wrap-tests-with-act), but, after reading it, you still might be not sure how to fix the problem.

So how to get rid of the warning? In your tests, you probably use a helper function to wait for the response (like [waait](https://github.com/wesbos/waait) used in the [Apollo docs](https://www.apollographql.com/docs/react/recipes/testing/#testing-final-state)). You should wrap it in the asynchronous `act` function (introduced in [React 16.9](https://reactjs.org/blog/2019/08/08/react-v16.9.0.html#async-act-for-testing)):

```javascript
async function wait(ms = 0) {
  await act(() => {
    // you could use waait here instead if you prefer
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  });
}
```

Let's look at a complete example: I created a React component which fetches and shows the data of the currently logged-in user:

```javascript
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React from 'react';

export const PROFILE_QUERY = gql`
  query ProfileQuery {
    currentUser {
      id
      username
      postsCount
    }
  }
`;

export default function Profile() {
  const { data, loading, error } = useQuery(PROFILE_QUERY);

  if (error) {
    throw error;
  }

  if (loading) {
    return 'Loading';
  }

  if (!(data && data.currentUser)) {
    throw new Error('Cannot fetch data');
  }

  const { currentUser } = data;

  return (
    <div>
      <p>Username: {currentUser.id}</p>
      <p>Posts count: {currentUser.postsCount}</p>
    </div>
  );
}
```

How to write a test for it?

```javascript
import { MockedProvider } from '@apollo/react-testing';
import { act, render } from '@testing-library/react';
import React from 'react';

import Profile, { PROFILE_QUERY } from '../Profile';

const MOCKS = [
  {
    request: {
      query: PROFILE_QUERY,
    },
    result: {
      data: {
        currentUser: {
          id: '1',
          username: 'Johny',
          postsCount: 123,
        },
      },
    },
  },
];

async function wait(ms = 0) {
  await act(() => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  });
}

it('renders', async () => {
  const { container } = render(
    <MockedProvider addTypename={false} mocks={MOCKS}>
      <Profile />
    </MockedProvider>
  );
  expect(container.textContent).toBe('Loading');

  await wait();

  expect(container.textContent).toMatch('Username: 1');
  expect(container.textContent).toMatch('Posts count: 123');
});

```

You can find the full source code in [this GitHub repository](https://github.com/trojanowski/apollo-hooks-sample-test).
Please notice that I'm using [React Testing Library](https://github.com/testing-library/react-testing-library) there. It's possible to write similar code using [react-test-renderer](https://reactjs.org/docs/test-renderer.html) instead, but it requires more boilerplate.
