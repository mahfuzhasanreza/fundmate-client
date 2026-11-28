import React, { useState } from 'react'
import { ChevronDown, Send, Mail, MessageSquare } from 'lucide-react'

const faqs = [
  {
    question: "How does FundMate's peer-to-peer lending work?",
    answer: "FundMate connects borrowers directly with lenders. Borrowers post loan requests with their requirements, and lenders can review these requests and make offers with competitive interest rates. Once a borrower accepts an offer, a loan agreement is created and funds are transferred securely."
  },
  {
    question: "What are the interest rates and fees?",
    answer: "Interest rates are determined by competitive offers from lenders, typically ranging from 5% to 15% annually. FundMate charges a small service fee of 2% on successfully funded loans and campaigns. No upfront fees or hidden charges - you only pay when you successfully receive funding."
  },
  {
    question: "How secure is my personal and financial information?",
    answer: "We use bank-grade encryption and security measures to protect all user data. We comply with financial data protection regulations and never share personal information with third parties without consent. Your privacy and security are our top priorities."
  },
  {
    question: "How long does it take to get funding?",
    answer: "Loan approval time depends on lender interest - some loans receive offers within hours, while others may take a few days. For campaigns, funding is continuous until the target is reached. Once you accept a loan offer, funds are typically transferred within 24-48 hours."
  }
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index)

  return (
    <section id="faq" className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-primary-600">Questions</span>
          </h2>
          <p className="text-lg text-gray-600">
            Answers to common questions about FundMate's services and how we can help you reach your financial goals.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200 border-y border-gray-200 bg-white rounded-xl border-x">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.answer}</p>
                )}
              </div>
            )
          })}
        </div>

        {/* Contact Support */}
        <div className="max-w-5xl mx-auto mt-16 bg-white rounded-xl border border-gray-200 p-8 md:p-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Contact Support</h3>
            <p className="text-gray-600">
              Reach out anytime. We typically respond within one business day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg bg-gray-50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="h-5 w-5 text-primary-600" />
                <h4 className="font-semibold text-gray-900">Email</h4>
              </div>
              <a
                href="mailto:mahfuzhasanreza1@gmail.com"
                className="text-sm font-medium text-primary-700 hover:underline break-all"
              >
                mahfuzhasanreza1@gmail.com
              </a>
              <p className="text-xs text-gray-500 mt-2">Best for detailed questions</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="h-5 w-5 text-primary-600" />
                <h4 className="font-semibold text-gray-900">Office</h4>
              </div>
              <p className="text-sm text-gray-700">United City, Madani Ave</p>
              <p className="text-sm text-gray-700">Dhaka, Bangladesh</p>
              <p className="text-xs text-gray-500 mt-2">Sun–Thu · 10:00–18:00</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Send className="h-5 w-5 text-primary-600" />
                <h4 className="font-semibold text-gray-900">Phone</h4>
              </div>
              <p className="text-sm text-gray-700">+8801770-452285</p>
              <p className="text-xs text-gray-500 mt-2">Quick support during office hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
