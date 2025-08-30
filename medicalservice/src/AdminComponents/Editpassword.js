import React from "react";

const EditPassword = (props) => {
  const handleEditPassword = async () => {
    try {
      const replyText = props.passwords.trim(); 
      if (replyText === "") {
        alert("Please write your reply.");
        return;
      }

      const response = await fetch("http://localhost:8080/updatereplay", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.user.id,
          name: props.user.name,
          email: props.user.email,
          phone: props.user.phone,
          password: props.user.password,
        }),
      });

      if (response.ok) {
        props.setEditPassword((prevPassword) => ({
          ...prevPassword,
          [props.user.id]: replyText,
        }));

        alert("Reply sent successfully.");
      } else {
        alert("Failed to send reply. Please try again.");
      }
    } catch (error) {
      console.error("Error during reply:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <tr key={props.user.id}>
      <td>{props.user.name}</td>
      <td>{props.user.email}</td>
      <td>{props.user.phone}</td>
      <td>{props.user.password}</td>
      <td>
        <button onClick={handleEditPassword}>Edit Password</button>
      </td>
    </tr>
  );
};

export default EditPassword;
