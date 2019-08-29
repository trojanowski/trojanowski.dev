import React from "react"

import "./newsletter-form.css"

export default function NewsletterForm() {
  return (
    <aside>
      <form
        action="https://gmail.us20.list-manage.com/subscribe/post?u=d488bb9adc8cf980c14e34b07&amp;id=09789322ca"
        className="NewsletterForm"
        method="post"
        target="_blank"
      >
        <h3 className="NewsletterForm__header">Join the Newsletter</h3>
        <p>Subscribe to get my latest content by email.</p>
        <div className="NewsletterForm__field">
          <input
            className="NewsletterForm__input"
            placeholder="Your email address"
            type="email"
            defaultValue=""
            name="EMAIL"
            required
          />
        </div>
        <div className="NewsletterForm__field">
          <input
            className="NewsletterForm__input"
            placeholder="Your first name"
            type="text"
            defaultValue=""
            name="FNAME"
          />
        </div>
        <button className="NewsletterForm__submit" type="submit">
          Subscribe
        </button>
      </form>
    </aside>
  )
}
