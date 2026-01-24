import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/5678" className="wd-dashboard-course-link">
            <Image
              src="/images/Typescript.svg.png"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS5678 Typescript </h5>
              <p className="wd-dashboard-course-title">
                Introduction to Typescript
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/4321" className="wd-dashboard-course-link">
            <Image
              src="/images/database.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS4321 Database Design </h5>
              <p className="wd-dashboard-course-title">
                Advanced Database Design for Web Developers
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/8765" className="wd-dashboard-course-link">
            <Image
              src="/images/testing.png"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS8765 Testing </h5>
              <p className="wd-dashboard-course-title">
                Introduction to Test Engineering
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/0000" className="wd-dashboard-course-link">
            <Image
              src="/images/racket.svg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS0000 Racket </h5>
              <p className="wd-dashboard-course-title">Racket Masterclass</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1111" className="wd-dashboard-course-link">
            <Image
              src="/images/job-search.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS1111 Job Search </h5>
              <p className="wd-dashboard-course-title">
                How to Find a Career as a Software Engineer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/2222" className="wd-dashboard-course-link">
            <Image
              src="/images/laughing-robot.webp"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS2222 Code Humor </h5>
              <p className="wd-dashboard-course-title">
                Writing Funny Comments 101
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
