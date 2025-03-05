import { useGetUsersQuery } from '../features/auth/authApi';

const Users = () => {
  const { data, isLoading, error } = useGetUsersQuery({ page: 1, limit: 10 });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div>
      <h2>User List</h2>
      {console.log(data)}
      <ul>
        {data.data.users?.map(user => (
          <li key={user._id}> <b>{user._id}</b>    -     {user.name}    -     <b><em>{user.email}</em></b> </li> 
        ))}
      </ul>
    </div>
  );
};


export default Users; 