import React from 'react';

const Contact = () => {
  return (
    <div className="bg-blue-200 h-screen flex items-center justify-center">
      <div className="p-4 max-w-xl w-full bg-yellow-200 rounded-lg shadow-lg text-center">
        <p className="text-2xl text-gray-800 font-serif p-4">
          If you have any questions or need assistance, please feel free to contact us. You can reach out to us at <a href="mailto:mahrukhtariq2001@gmail.com" className="text-blue-500">mahrukhtariq2001@gmail.com</a>. Our team is here to help you with any inquiries or support you may require.
        </p>
      </div>
    </div>
  );
}

export default Contact;
