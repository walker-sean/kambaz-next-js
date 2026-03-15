import Link from "next/link";
export default function labs() {
  return (
    <div id="wd-labs">
      <h1>Labs - Sean Walker - Online Section</h1>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link href="/labs/lab1" id="wd-lab1-link" className="nav-link">
            Lab 1: HTML Examples
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/labs/lab2" id="wd-lab2-link" className="nav-link">
            Lab 2: CSS Basics
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/labs/lab3" id="wd-lab3-link" className="nav-link">
            Lab 3: JavaScript Fundamentals
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/labs/lab4" id="wd-lab4-link" className="nav-link">
            Lab 4: State
          </Link>
        </li>
      </ul>
    </div>
  );
}
