import React, { useEffect, useState } from 'react';
import { API } from '../../service/api';

const UserProfile = ({ username }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileResponse = await API.getUserProfile(username);
        if (profileResponse.isSuccess) {
          setUserProfile(profileResponse.data);
        } else {
          setError(profileResponse.msg);
        }
      } catch (error) {
        setError('Error occurred while fetching user profile');
      }
    };

    const fetchUserPosts = async () => {
      try {
        const postsResponse = await API.getPostsByUsername(username);
        if (postsResponse.isSuccess) {
          setUserPosts(postsResponse.data);
        } else {
          setError(postsResponse.msg);
        }
      } catch (error) {
        setError('Error occurred while fetching user posts');
      }
    };

    fetchUserProfile();
    fetchUserPosts();
  }, [username]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userProfile ) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {userProfile.username}</p>
      <p>Name: {userProfile.name}</p>

      <h3>Posts by {userProfile.username}</h3>
      {userPosts.map((post) => (
        <div key={post.id}>
          <h4>{post.title}</h4>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;





// import React, { useEffect, useState } from 'react';
// import { API } from '../../service/api';

// const UserProfile = ({ username }) => {
//   const [userProfile, setUserProfile] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await API.getUserProfile(username);
//         if (response.isSuccess) {
//           setUserProfile(response.data);
//         } else {
//           setError(response.msg);
//         }
//       } catch (error) {
//         setError('Error occurred while fetching user profile');
//       }
//     };

//     fetchUserProfile();
//   }, [username]);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!userProfile) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>User Profile</h2>
//       <p>Username: {userProfile.username}</p>
//       <p>Name: {userProfile.name}</p>
//       {/* Display other user profile information */}
//     </div>
//   );
// };

// export default UserProfile;

