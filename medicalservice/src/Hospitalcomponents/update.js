import React from "react";
import "./update.css";
export default function Update(props) {
  const handleReply = async () => {
    try {
      const replyText = props.Reply.trim();

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
          replies: props.Reply,
          name: props.user.name,
          email: props.user.email,
          qurey: props.user.qurey,
          doctor: props.Doctor,
          hospital: props.user.hospital,
        }),
      });

      if (response.ok) {
        props.setReplies((prevReplies) => ({
          ...prevReplies,
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
    <tr key={props.user.id} className=" text-center">
      <td>{props.user.id}</td>
      <td>{props.user.name}</td>
      <td>{props.user.qurey}</td>

      <td>
        <textarea
          className="form-control "
          placeholder="Replies"
          rows="1"
          cols="15"
          onChange={(e) => props.setReply(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          placeholder="Enter Doctor Name"
          className="form-control "
          onChange={(e) => props.setDoctor(e.target.value)}
        />
      </td>
      <td>
        <button class="btn btn-primary" type="button" onClick={handleReply}>
          Send Reply
        </button>
      </td>
    </tr>
  );
}
