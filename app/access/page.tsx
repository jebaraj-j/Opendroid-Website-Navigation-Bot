import Link from "next/link"
import { Check } from "lucide-react"

export default function AccessPage() {
  return (
    <div className="py-20 grid-pattern">
      <div className="container-custom">
        <h1 className="page-heading text-center">Access</h1>
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
          Explore our access options and find the right plan for your needs. Whether you're a researcher, developer, or
          organization, we have options to help you leverage our technology.
        </p>

        {/* Access Plans */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Basic",
                description: "Perfect for individual researchers and small projects",
                price: "Free",
                features: [
                  "Access to basic AI models",
                  "Limited API calls",
                  "Community support",
                  "Public documentation",
                  "Sample projects",
                ],
                cta: "Get Started",
                highlighted: false,
              },
              {
                name: "Professional",
                description: "Ideal for professional developers and research teams",
                price: "$99/month",
                features: [
                  "Access to all AI models",
                  "Unlimited API calls",
                  "Priority support",
                  "Advanced documentation",
                  "Custom integrations",
                  "Team collaboration tools",
                ],
                cta: "Subscribe Now",
                highlighted: true,
              },
              {
                name: "Enterprise",
                description: "Tailored solutions for organizations and large-scale deployments",
                price: "Custom Pricing",
                features: [
                  "Full access to all technology",
                  "Dedicated support team",
                  "Custom model training",
                  "On-premises deployment options",
                  "SLA guarantees",
                  "Compliance and security features",
                ],
                cta: "Contact Sales",
                highlighted: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`card p-8 flex flex-col ${plan.highlighted ? "border-gray-500 relative" : ""}`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <div className="text-3xl font-bold mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.name === "Enterprise" ? "/contact" : "#"}
                  className={`text-center py-2 px-4 rounded-md ${
                    plan.highlighted
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "border border-gray-700 hover:bg-gray-800"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Access Process */}
        <section className="mb-20">
          <h2 className="section-heading text-center mb-12">How to Get Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Choose a Plan",
                description: "Select the access plan that best fits your needs and requirements.",
              },
              {
                step: "2",
                title: "Create an Account",
                description: "Sign up and create your account with your email and password.",
              },
              {
                step: "3",
                title: "Verify Identity",
                description: "Complete the verification process to secure your account.",
              },
              {
                step: "4",
                title: "Start Using",
                description: "Access our platform and start using our AI and robotics technology.",
              },
            ].map((item) => (
              <div key={item.step} className="card p-6 text-center">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="section-heading text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "What type of access do I need for my project?",
                answer:
                  "The type of access you need depends on your project requirements. Basic access is suitable for individual researchers and small projects, Professional is ideal for development teams, and Enterprise is designed for organizations with large-scale deployment needs.",
              },
              {
                question: "Can I upgrade my plan later?",
                answer:
                  "Yes, you can upgrade your plan at any time. Your billing will be prorated based on the time remaining in your current billing cycle.",
              },
              {
                question: "Is there a trial period available?",
                answer:
                  "Yes, we offer a 14-day free trial for our Professional plan. This allows you to explore all the features before committing to a subscription.",
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise customers.",
              },
              {
                question: "Can I cancel my subscription?",
                answer:
                  "Yes, you can cancel your subscription at any time. Your access will remain active until the end of your current billing period.",
              },
              {
                question: "Do you offer academic discounts?",
                answer:
                  "Yes, we offer special pricing for academic institutions and researchers. Please contact our sales team for more information.",
              },
            ].map((item, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-xl font-semibold mb-4">{item.question}</h3>
                <p className="text-gray-400">{item.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-300 mb-6">Still have questions? We're here to help.</p>
            <Link href="/contact" className="btn-primary inline-block">
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
