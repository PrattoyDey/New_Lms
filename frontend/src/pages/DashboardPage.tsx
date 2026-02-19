import authorization from "@/core/Authorization";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function DashboardPage() {
  const permissionMap = JSON.parse(
    localStorage.getItem("permissionMap") || "{}"
  );

  const role = Object.keys(permissionMap).length
    ? "Authenticated User"
    : "Guest";

  return (
    <div className="min-h-screen p-10 space-y-6">
      <h1 className="text-3xl font-bold">
        Welcome to LMS Dashboard
      </h1>

      <p className="text-gray-600">
        Role: <strong>{role}</strong>
      </p>

      <div className="flex gap-4 flex-wrap">
        <Link to="/courses">
          <Button>View Courses</Button>
        </Link>

        {authorization.isAuthorized("can_create_course") && (
          <Link to="/create-course">
            <Button>Create Course</Button>
          </Link>
        )}

        {authorization.isAuthorized("can_enroll_course") && (
          <Link to="/courses">
            <Button variant="secondary">
              Enroll in Courses
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
