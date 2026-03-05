import React from "react";

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
                <p className="text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>

            <div className="prose prose-green max-w-none text-gray-600 space-y-8">
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">1. Agreement to Terms</h2>
                    <p>
                        By accessing or using Ecoyaan's website ("Site") and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service. These Terms apply to all visitors, users, and others who access or use the Service.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">2. Ecoverify™ and Product Claims</h2>
                    <p>
                        We use our proprietary Ecoverify™ AI system to vet products based on their manufacturer's claims and publicly available data regarding sustainability. While we strive to ensure absolute accuracy, Ecoyaan does not guarantee that every claim is 100% flawless at all times. By purchasing, you acknowledge that our vetting process is a continual effort.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">3. User Accounts</h2>
                    <p>
                        When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">4. Intellectual Property</h2>
                    <p>
                        The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Ecoyaan and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">5. Termination</h2>
                    <p>
                        We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">6. Changes</h2>
                    <p>
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                    </p>
                </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                    If you have any questions about these Terms, please contact us at legal@ecoyaan.com.
                </p>
            </div>
        </div>
    );
}
