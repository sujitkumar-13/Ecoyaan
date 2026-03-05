import React from "react";
import { Lock } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="flex items-center gap-4 mb-12">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-700">
                    <Lock className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                    <p className="text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
            </div>

            <div className="bg-green-50 rounded-xl p-8 mb-12 border border-green-100">
                <h3 className="font-bold text-green-900 mb-2">Our Promise</h3>
                <p className="text-green-800 text-sm leading-relaxed">
                    At Ecoyaan, just as we care about the environment, we care about your privacy. We believe that your personal data belongs to you. We only collect what is strictly necessary to deliver your sustainable products and improve your shopping experience. We will never sell your personal information to third parties.
                </p>
            </div>

            <div className="prose prose-green max-w-none text-gray-600 space-y-8">
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Personal Information:</strong> Name, email address, shipping and billing addresses, and phone number when you register or check out.</li>
                        <li><strong>Payment Information:</strong> Handled securely by our payment processors; we do not store full credit card numbers on our servers.</li>
                        <li><strong>Usage Data:</strong> Information on how you interact with our website, such as IP address, browser type, and pages visited, collected via cookies to enhance site functionality.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>To process and fulfill your orders, including sending order confirmations and tracking details.</li>
                        <li>To communicate with you regarding customer support inquiries.</li>
                        <li>To personalize your shopping experience by recommending sustainable products you might like.</li>
                        <li>To send you our newsletter, only if you have explicitly opted in.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">3. Data Sharing and Disclosure</h2>
                    <p>
                        We do not sell or rent your personal information. We only share data with trusted third-party service providers (such as shipping partners and payment gateways) solely for the purpose of fulfilling our services to you. These partners are strictly bound by confidentiality agreements.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">4. Security of Your Information</h2>
                    <p>
                        We implement rigorous security measures, including SSL encryption and regular vulnerability audits, to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">5. Your Rights</h2>
                    <p>
                        You have the right to access, update, or delete your personal information at any time through your account settings. If you wish to completely erase your data from our systems, please contact us at privacy@ecoyaan.com.
                    </p>
                </section>
            </div>
        </div>
    );
}
