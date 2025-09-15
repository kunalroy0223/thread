import React, { useState } from "react";
import Sidebar from "../../components/user/sidebar";
import { useNavigate } from "react-router-dom";
import StartBlog from "../../components/user/startBlog";
import "../../styles/user/create.scss";

const Create = () => {
 
//pagespeedinsights API: AIzaSyCnihQgIExn5fGGQZ4ZTp0Oy7-Xl5wE-EQ 
  return (
    <div className="create-page-container">
      <Sidebar />
      <StartBlog />
    </div>
  );
};

export default Create;
