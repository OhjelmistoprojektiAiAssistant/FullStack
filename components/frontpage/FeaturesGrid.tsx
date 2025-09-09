import { Briefcase, Rocket, User } from "lucide-react"
import Image from "next/image";


const features = [
  {
    icon: <User className="w-6 h-6 text-blue-600" />,
    title: "Create your profile",
    description:
      "Input your strengths, education, work experience, and other relevant details just once.",
  },
  {
    icon: <Briefcase className="w-6 h-6 text-blue-600" />,
    title: "Paste job listing",
    description:
      "Scroll through job listings and simply paste the job description, and our AI will analyze the key requirements.",
  },
  {
    icon: <Rocket className="w-6 h-6 text-blue-600" />,
    title: "Generate application",
    description:
      "Our AI creates a tailored application highlighting how your skills match the job requirements.",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="px-8 pb-16">
         {/* Features */}
      <div className="px-8 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How AI Career Assistant works
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our platform makes job applications simple, fast, and effective.
        </p>
      </div>
      <div className="flex justify-center gap-28  ">
        <div className="">
          <Image
            src="/images/profile.jpg"
            alt="Profile"
            width={270}
            height={300}
            className="mx-auto mb-8 rounded-lg "
            priority
          />
        </div>
        <div className="">
          <Image
            src="/images/jobSearch.jpg"
            alt="Job Search"
            width={200}
            height={300}
            className="mx-auto mb-8 rounded-lg "
            priority
          />
        </div>
        <div>
          <Image
            src="/images/wheel.jpg"
            alt="wheels"
            width={230}
            height={300}
            className="mx-auto mb-8 rounded-lg "
            priority
          />
        </div>
        <div>
          <Image
            src="/images/AI.jpg"
            alt="AI"
            width={270}
            height={200}
            className="mx-auto mb-8 rounded-lg "
            priority
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-white rounded-lg p-6 shadow hover:shadow-md transition"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-md mb-4">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}