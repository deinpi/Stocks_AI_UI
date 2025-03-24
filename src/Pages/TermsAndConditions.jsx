import React from "react";
import {useNavigate} from "react-router-dom";
import {Footer} from "../UI/Footer.jsx";

const TermsAndConditions = () => {
  const navigate = useNavigate(); // Hook to navigate between pages

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Terms and Conditions
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Welcome to Stocks AI! By using our platform, you agree to the
          following terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          By accessing or using our services, you agree to be bound by these
          terms. If you do not agree, please do not use our services.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
          2. Privacy Policy
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your privacy is important to us. Please review our Privacy Policy to
          understand how we collect, use, and protect your information.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
          3. User Responsibilities
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          You are responsible for maintaining the confidentiality of your
          account and password and for restricting access to your account.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
          4. Disclaimer of Liability
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          The information and recommendations provided by Stocks AI are for
          informational purposes only and should not be considered financial
          advice. Any trades or investment decisions made based on our AI
          recommendations are solely at your own risk. Stocks AI does not
          guarantee the accuracy, reliability, or profitability of any
          predictions or recommendations. We are not responsible for any
          financial losses incurred as a result of using our platform.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
          5. Changes to Terms
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          We reserve the right to modify these terms at any time. Continued use
          of our services constitutes acceptance of the updated terms.
        </p>

        <p className="text-gray-600 dark:text-gray-400 mt-4">
          If you have any questions about these terms, please contact us at
          support@stonkai.store.
        </p>

        {/* Go Back to Register Button */}

        <div className="mt-6 flex justify-cente">
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mx-auto w-1/2"
          >
            Back
          </button>
        </div>

      </div>
      <Footer/>
    </div>
  );
};

export default TermsAndConditions;
