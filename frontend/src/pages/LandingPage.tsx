import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Import banner image
import landingBanner from "@/assets/images/landing-banner.png";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* HERO SECTION WITH FULL WIDTH BANNER */}
      <section
        className="relative h-[80vh] w-full flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${landingBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">
            Modern Learning Management System
          </h1>

          <p className="text-lg mb-8">
            A scalable LMS built using Django and React with
            dynamic permission-based authorization. Create
            courses, enroll students, and manage access with
            centralized permission control.
          </p>

          <div className="flex gap-4 justify-center">
            <Link to="/login">
              <Button size="lg">Get Started</Button>
            </Link>

            <Link to="/courses">
              <Button variant="secondary" size="lg">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-10 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">
          Key Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="border rounded-lg p-6 text-center shadow-sm">
            <h3 className="font-semibold text-xl mb-3">
              JWT Authentication
            </h3>
            <p className="text-gray-600">
              Secure authentication using access and refresh
              tokens with automatic renewal.
            </p>
          </div>

          <div className="border rounded-lg p-6 text-center shadow-sm">
            <h3 className="font-semibold text-xl mb-3">
              Dynamic Permissions
            </h3>
            <p className="text-gray-600">
              Centralized permission engine controlling both UI
              and backend access.
            </p>
          </div>

          <div className="border rounded-lg p-6 text-center shadow-sm">
            <h3 className="font-semibold text-xl mb-3">
              Role-Based Access
            </h3>
            <p className="text-gray-600">
              Different experiences for students, creators,
              and administrators.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 text-gray-500">
        © {new Date().getFullYear()} LMS Project — Built with Django + React
      </footer>
    </div>
  );
}

export default LandingPage;
