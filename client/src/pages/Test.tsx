import { useUsers } from '../hooks/useUsers';
import LogoutButton from '../components/LogoutButton';
const Test = () => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <LogoutButton />
      <h1>Test</h1>
      {users ? (
        users.map((user) => (
          <div key={user.id}>
            <p>{user.first_name}</p>
            <p>{user.email}</p>
          </div>
        ))
      ) : (
        <p>No users found.</p>
      )}

      {error && <p>Error fetching users.</p>}
    </div>
  );
};

export default Test;
