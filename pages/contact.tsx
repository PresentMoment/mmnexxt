import { NextSeo } from "next-seo";
import React, { useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
function Contact() {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  const handleAfterClick = () => {
    setActive(!active);
  };
  const CustomForm = ({ status, message, onValidated }) => {
    let email, name;
    const submit = () =>
      email &&
      name &&
      email.value.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email.value,
        NAME: name.value,
      });

    return (
      <div
        style={{
          border: "0.8px",
          display: "inline-block",
        }}
      >
        {status === "sending" && (
          <div style={{ color: "blue" }}>sending...</div>
        )}
        {status === "error" && (
          <div
            style={{ color: "red" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === "success" && (
          <div
            style={{ color: "green" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        <input
          style={{ padding: 5 }}
          ref={(node) => (name = node)}
          type="text"
          placeholder="Your email"
        />
        <button
          style={{
            borderStyle: "solid",
            padding: 5,
            backgroundColor: active ? "#c9c7c7" : "#ffff",
            borderWidth: 0.8,
            borderColor: "#000000",
          }}
          onMouseDown={handleClick}
          onMouseUp={handleAfterClick}
          onClick={submit}
        >
          Submit
        </button>
      </div>
    );
  };
  return (
    <>
    <NextSeo
title="MMXX - Contact"
description="Via Donatello 35, 20131 MILANO"
openGraph={{
type: 'website',
locale: 'en_IE',
//url: `${process.env.BASE_URL+router.asPath}`,
title: `MMXX`,
description: 'Via Donatello 35, 20131 MILANO',
// images: [
//   {
//     url: `${exhibit.imgUrl}`,
//     width: 800,
//     height: 600,
//     alt: `${exhibit.name.artist}: ${exhibit.title}`,
//   },
// ],
site_name: 'MMXX',
}}
// twitter={{
//   site: `${process.env.BASE_URL}`,
//   cardType: "summary_large_image",
// }}
/>
    <div className="content">
      <p>
        <span style={{ height: "1rem" }} />
        <span /> MMXX
        <span /> Via Donatello 35 <span /> 20131 MILANO{" "}
        <span style={{ height: "1rem" }} />
        <span style={{ height: "1rem" }} /> Open by appointment only
        <span style={{ height: "1rem" }} /> <span style={{ height: "1rem" }} />
        <a href="mailto:mmxx.posta@gmail.com">mmxx.posta@gmail.com</a>
        <span style={{ height: "3rem" }} />
        Newsletter
      </p>
      <MailchimpSubscribe
        url={
          "https://tumblr.us12.list-manage.com/subscribe/post?u=188da0c81d3a59e2d5bbae1fd&amp;id=5cbf52a839"
        }
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
          // <div>
          //   <input type="text" placeholder="your email" />
          // </div>
        )}
      />
    </div>
    </>
  );
}

export default Contact;
