import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import "../../styles/auth.css";

export default function RegisterPage() {
  return (
    <div className="container">
      <div className="authWrap">
        <div className="authCard">
          <h1 className="authTitle">Register</h1>
          <p className="authHint">
            DEMO DEMO <code>/auth/register</code>.
          </p>
          <Card>
            <b>DEMO:</b>DEMO.
          </Card>
          <div className="actions">
            <Link className="navLink" to="/login">Back to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}