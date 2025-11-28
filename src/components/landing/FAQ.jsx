import React, { useState } from 'react'
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

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

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary-100 text-primary-600 mb-6 mx-auto"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <MessageCircle className="h-8 w-8" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Get answers to common questions about FundMate's services and how we can help you achieve your financial goals.
          </p>
        </motion.div>
        
        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
              >
                <motion.button
                  className="w-full px-8 py-6 text-left focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all duration-200"
                  onClick={() => toggleAccordion(index)}
                  whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.02)" }}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <ChevronDown className="h-5 w-5 text-primary-600" />
                      </div>
                    </motion.div>
                  </div>
                </motion.button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6 border-t border-gray-100">
                    <motion.p 
                      className="text-gray-700 leading-relaxed pt-4"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ 
                        y: openIndex === index ? 0 : -10, 
                        opacity: openIndex === index ? 1 : 0 
                      }}
                      transition={{ duration: 0.3, delay: openIndex === index ? 0.1 : 0 }}
                    >
                      {faq.answer}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Contact Support CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you get started with FundMate and answer any questions you might have.
            </p>
            <motion.button 
              className="btn-primary px-8 py-4 text-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ