export default function About() {
  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      image: "https://via.placeholder.com/150",
      description: "John has over 10 years of experience in real estate and is passionate about helping clients find their dream homes.",
    },
    {
      name: "Jane Smith",
      role: "Lead Agent",
      image: "https://via.placeholder.com/150",
      description: "Jane specializes in luxury properties and has a proven track record of successful transactions.",
    },
    {
      name: "Mike Johnson",
      role: "Marketing Head",
      image: "https://via.placeholder.com/150",
      description: "Mike is responsible for creating innovative marketing strategies to showcase our properties.",
    },
    {
      name: "Sarah Lee",
      role: "Customer Support",
      image: "https://via.placeholder.com/150",
      description: "Sarah ensures that our clients receive the best support throughout their journey with us.",
    },
  ];

  return (
    <div className="py-20 px-4 max-w-6xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">
        About <span className="text-purple-600">Basha Lagbe</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to Basha Lagbe, your one-stop solution to finding the perfect house for rent! In a fast-paced world where time and convenience matter, Basha Lagbe strives to make the house-hunting process as easy and stress-free as possible. Whether you are a student, a working professional, or a family looking for a new place, our platform connects you to a wide range of rental properties that match your needs. With an intuitive interface and a vast database of listings, Basha Lagbe helps you discover your ideal home without the hassle.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-purple-800">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At Basha Lagbe, our goal is to revolutionize the way people find rental homes. We aim to be the most trusted and user-friendly platform where renters can easily access real-time, accurate listings with detailed information about properties. We envision a world where renters no longer need to face uncertainty, stress, or overwhelming choices.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Our Commitment</h2>
          <p className="text-gray-700 leading-relaxed">
            Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.
          </p>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-blue-800">{member.name}</h3>
              <p className="text-purple-600 mb-2">{member.role}</p>
              <p className="text-gray-700">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}