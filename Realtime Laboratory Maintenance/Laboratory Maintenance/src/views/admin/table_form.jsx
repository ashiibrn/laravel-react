import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: null,
    name: '',
    id_number: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (user.id) {
      // Update existing user
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          navigate('/users');
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      // Create new user
      axiosClient.post('/users', user)
        .then(() => {
          navigate('/users');
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && <div className="alert">{Object.keys(errors).map(key => (<p key={key}>{errors[key][0]}</p>))}</div>}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={user.name} onChange={ev => setUser({ ...user, name: ev.target.value })} placeholder="Name" />
            <input value={user.id_number} onChange={ev => setUser({ ...user, id_number: ev.target.value })} placeholder="ID Number" />
            <input value={user.email} onChange={ev => setUser({ ...user, email: ev.target.value })} placeholder="Email" />
            <input type="password" onChange={ev => setUser({ ...user, password: ev.target.value })} placeholder="Password" />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
