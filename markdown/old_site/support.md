---
title: CONTACT AND SUPPORT – Your Uninstaller! 7
source_url: https://ursoftware.com/support/
lastmod: 2024-03-31T23:56:55+08:00
fetched_at: 2025-11-27T05:15:00.000Z
original_path: /support/
---

#### We’re excited to talk to you! Fill out the form below and we’ll be in touch.

URSoft is committed to providing users and customers with high quality support and assistance. When you encounter a problem, or have a question, or need any other help with our products, you can ask us for help.

Your message will be carefully handled by our experienced staff, the response normally is within 48 hours.

### Lost your key?

If you have accidentally lost your registration code, we understand that this may cause some inconvenience. To assist you in recovering your registration code, please click the "Get My Key" button.

[Get My Key](https://cms.ursoftware.com/orders/lostkey)

### Contact Form

```html
<div>
    <div class="column_attr mfn-inline-editor clearfix" style="background-color: #ffffff; padding: 20px">
        <p></p>
        <h3>Contact Form</h3>
        <!-- modify this form HTML and place wherever you want your form -->
        <form id="frmContact" name="survey-form" accept-charset="utf-8" action="https://formspree.io/f/mvoezadk" method="post">
            <fieldset id="frm-inputs">
                <label for="full-name">Full Name</label>
                <input type="text" name="name" id="full-name" placeholder="First and Last" required="">
                <label for="email-address">Email Address</label>
                <input type="email" name="_replyto" id="email-address" placeholder="your.email@domain.tld" required="">
                <input type="email" name="_email2" id="email-address2">
                <fieldset id="frm-selects">
                    <label for="timely">Subject</label>
                    <select name="_subject" id="subject" required="">
                        <option value="No Subject" selected="" disabled="">
                            Choose
                        </option>
                        <option value="Pre-purchase Questions">
                            Pre-purchase Questions
                        </option>
                        <option value="Lost Key">
                            Pre-purchase Questions
                        </option>
                        <option value="Technical Inquiries">
                            Technical Inquiries
                        </option>
                        <option value="Other">Other</option>
                    </select>
                </fieldset>
                <label for="message">Message</label>
                <textarea rows="10" name="message" id="message" placeholder="Enter your message here..." required=""></textarea>
            </fieldset>
            <input type="submit" class="button button_theme" value="Send">
            <br>
            <p id="my-form-status"></p>
        </form>
        <style>
            /* reset */
            #my-form-status {
                color: green;
            }
            #frmContact input,
            #frmContact select,
            #frmContact textarea,
            #frmContact fieldset,
            #frmContact optgroup,
            #frmContact label,
            #frmContact #card-element:disabled {
                font-family: inherit;
                font-size: 100%;
                color: inherit;
                border: none;
                border-radius: 0;
                display: block;
                width: 100%;
                padding: 0;
                margin: 0;
                -webkit-appearance: none;
                -moz-appearance: none;
            }

            #frmContact label,
            #frmContact legend,
            #frmContact ::placeholder {
                font-size: 0.825rem;
                margin-bottom: 0.5rem;
                padding-top: 0.2rem;
                display: flex;
                align-items: baseline;
            }

            /* border, padding, margin, width */
            #frmContact input,
            #frmContact select,
            #frmContact textarea,
            #frmContact #card-element {
                border: 1px solid rgba(0, 0, 0, 0.2);
                padding: 0.75em 1rem;
                margin-bottom: 1.5rem;
            }

            #frmContact input:focus,
            #frmContact select:focus,
            #frmContact textarea:focus {
                background-color: white;
                outline-style: solid;
                outline-width: thin;
                outline-color: gray;
                outline-offset: -1px;
            }

            #frmContact [type="text"],
            #frmContact [type="email"] {
                width: 100%;
            }

            #frmContact [type="button"],
            #frmContact [type="submit"],
            #frmContact [type="reset"] {
                width: auto;
                cursor: pointer;
                -webkit-appearance: button;
                -moz-appearance: button;
                appearance: button;
            }

            #frmContact [type="button"]:focus,
            #frmContact [type="submit"]:focus,
            #frmContact [type="reset"]:focus {
                outline: none;
            }

            #frmContact [type="submit"],
            #frmContact [type="reset"] {
                margin-bottom: 0;
                width: 120px;
            }

            #frmContact select {
                text-transform: none;
            }

            #frmContact [type="checkbox"] {
                -webkit-appearance: checkbox;
                -moz-appearance: checkbox;
                appearance: checkbox;
                display: inline-block;
                width: auto;
                margin: 0 0.5em 0 0 !important;
            }

            #frmContact [type="radio"] {
                -webkit-appearance: radio;
                -moz-appearance: radio;
                appearance: radio;
            }

            /* address, locale */
            #frmContact fieldset.locale input[name="city"],
            #frmContact fieldset.locale select[name="state"],
            #frmContact fieldset.locale input[name="postal-code"] {
                display: inline;
            }

            #frmContact fieldset.locale input[name="city"] {
                width: 52%;
            }

            #frmContact fieldset.locale select[name="state"],
            #frmContact fieldset.locale input[name="postal-code"] {
                width: 20%;
            }

            #frmContact fieldset.locale input[name="city"],
            #frmContact fieldset.locale select[name="state"] {
                margin-right: 3%;
            }
            #frmContact input[type="submit"] {
                color: white;
                padding: 12px 20px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            #email-address2 {
                display: none !important;
            }
        </style>
        <!-- Place this script at the end of the body tag -->
        <script type="text/javascript">
            var form = document.getElementById("frmContact")

            async function handleSubmit(event) {
                event.preventDefault()
                var status =
                    document.getElementById("my-form-status")
                var data = new FormData(event.target)
                fetch(event.target.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        Accept: "application/json",
                    },
                })
                    .then((response) => {
                        if (response.ok) {
                            status.innerHTML =
                                "Thanks for your submission! We have received your message and will reply to you soon."
                            form.reset()
                        } else {
                            response.json().then((data) => {
                                if (Object.hasOwn(data, "errors")) {
                                    status.innerHTML = data[
                                        "errors"
                                    ]
                                        .map(
                                            (error) =>
                                                error["message"]
                                        )
                                        .join(", ")
                                } else {
                                    status.innerHTML =
                                        "Oops! There was a problem submitting your form"
                                }
                            })
                        }
                    })
                    .catch((error) => {
                        status.innerHTML =
                            "Oops! There was a problem submitting your form"
                    })
            }
            form.addEventListener("submit", handleSubmit)
        </script>
    </div>
</div>
```

## Try out 21-days trial

### It's free to download and try our software for three weeks. The trial version does almost the same as full version except for some tiny restrictions.

[Download](https://ursoftware.com/download/)

