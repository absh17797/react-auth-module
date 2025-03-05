// src/pages/Profile.jsx
import React from 'react';
import { useGetProfileQuery } from '../features/auth/authApi';
import { toast } from 'react-toastify';

const Profile = () => {
  const { data: user, error, isLoading } = useGetProfileQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    toast.error('Failed to load profile');
    return <div>Error loading profile</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <p><strong>ID :</strong> {user.data.id}</p>
          <p><strong>Name :</strong> {user.data.name}</p>
          <p><strong>Email :</strong> {user.data.email}</p>
          {/* Add more user details as needed */}
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Profile;