import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when input changes
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message is too short (minimum 10 characters)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      toast.success('Your message has been sent! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
            <p className="mt-2 text-lg text-gray-600">
              Have questions, suggestions, or need assistance? We're here to help!
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="bg-blue-600 text-white p-8 md:w-1/3">
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <p className="mb-8 opacity-90">
                  We value your feedback and are eager to answer any questions you may have about volunteering or resource sharing.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 mr-3 opacity-90" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="opacity-90">contact@helphub.org</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 mr-3 opacity-90" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="opacity-90">(555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 mr-3 opacity-90" />
                    <div>
                      <h3 className="font-medium">Office</h3>
                      <p className="opacity-90">
                        123 Community Lane<br />
                        Volunteer City, VC 12345
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8 md:w-2/3">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`block w-full rounded-md ${
                          errors.name ? 'border-red-300' : 'border-gray-300'
                        } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`block w-full rounded-md ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`block w-full rounded-md ${
                        errors.subject ? 'border-red-300' : 'border-gray-300'
                      } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Volunteer Opportunities">Volunteer Opportunities</option>
                      <option value="Resource Sharing">Resource Sharing</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`block w-full rounded-md ${
                        errors.message ? 'border-red-300' : 'border-gray-300'
                      } shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">How do I sign up for a volunteer opportunity?</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    You can create an account, browse the opportunities page, and click on "Sign Up" on any opportunity that interests you.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Can I offer resources anonymously?</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    No, all resource offerings require an account for safety and tracking purposes.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">How do I create my own volunteer opportunity?</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    Once logged in, visit the Opportunities page and click on "Create Opportunity" to post your own volunteer event.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Is there a mobile app available?</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    We're currently working on mobile apps for iOS and Android. For now, our website is fully responsive and works well on mobile browsers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;