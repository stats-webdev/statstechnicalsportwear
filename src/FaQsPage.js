import React from "react";
import './FaQsPage.css'
import Footer from "./Footer";
const faqs = [
  {
    category: "Modes of Payment",
    questions: [
      {
        question: "What are the available modes of payment?",
        answer: [
          "GCash Express Send",
          "BDO Bank Transfers",
          "Maya",
          "BPI"
        ]
      }
    ]
  },
  {
    category: "Shipping & Rates",
    questions: [
      {
        question: "What are the shipping rates and options?",
        answer: [
          "Regular Shipping via Gogo Express & LBC: Php 100 - Php 200",
          "ETA: 2-3 days for Metro Manila, 5-7 days for provinces",
          "Express Delivery via Lalamove & Grab Express: Rates depend on your delivery address."
        ]
      },
      {
        question: "Do you offer international shipping?",
        answer: "We offer delivery services beyond the borders of the Philippines. However, please note that the production lead time for pre-order items is approximately 10 to 15 business days, excluding the shipping lead time, which depends on your specific location."
      },
      {
        question: "What if my package gets lost or damaged?",
        answer: [
          "We are not responsible for any losses incurred by the courier during transit.",
          "In case of lost or damaged shipments, please contact the respective courier directly to file a complaint and resolve the issue.",
          "GoGo Express: customercare@gogoxpress.com",
          "LBC: customercare@lbcexpress.com"
        ]
      }
    ]
  },
  {
    category: "Track Your Order",
    questions: [
      {
        question: "How can I track my order?",
        answer: "The courier will send the tracking number via SMS as soon as your information has been encoded to their system."
      },
      {
        question: "Who can I contact for inquiries?",
        answer: "For any inquiries or concerns, please feel free to reach out to us via email: statsfxl@gmail.com."
      }
    ]
  }
];

const FAQsPage = () => {
  return (
    <div>
<div className="faqcontainer">
  <h3>Frequently Asked Questions</h3>

  {faqs.map((faq, index) => (
    <div key={index} className="faq-category">
      <h2>{faq.category}</h2>
      {faq.questions.map((q, i) => (
        <div key={i} className="faq-item">
          <h3>{q.question}</h3>
          {Array.isArray(q.answer) ? (
            <ul>
              {q.answer.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{q.answer}</p>
          )}
        </div>
      ))}
    </div>
  ))}
  </div>
  <Footer/>
</div>
  );
};

export default FAQsPage;
