import React, { useEffect, useState } from "react";
import "./Register.scss";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  updateProfile,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {

  serverTimestamp,
  doc,

  setDoc,
} from "firebase/firestore";
import { storage, db } from "../../../Firebase/Config";
import { Link, useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { message } from "antd";
function Register() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [AvtImage, setAvtImage] = useState();
  //set err
  const [error, setError] = message.useMessage();

  const handleAvtImage = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvtImage(file);
  };
  //get link img when selecting avt
  useEffect(() => {
    return () => {
      AvtImage && URL.revokeObjectURL(AvtImage);
    };
  }, [AvtImage]);
  //register
  const onSubmitRegister = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const PasswordConfirm = e.target[3].value;
    const birthday = e.target[4].value;

    if (password !== PasswordConfirm) {
      error.open({
        type: "error",
        content: "Passwords are not the same",
      });
      return;
    }
    if (!AvtImage) {
      error.open({
        type: "error",
        content: "Please choose your avatar",
      });
      return;
    }
    if (email && password && displayName && AvtImage) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const storageRef = ref(storage, "usersImages/" + displayName);
        const uploadTask = uploadBytesResumable(storageRef, AvtImage);
        uploadTask.on(
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateProfile(res.user, {
                  displayName,
                  photoURL: downloadURL,
                  roles: "user",
                });
                await setDoc(doc(db, "user", res.user.uid), {
                  displayName,
                  email: email,
                  photoURL: downloadURL,
                  uid: res.user.uid,
                  birthday: birthday,
                  timestamp: serverTimestamp(),
                  roles: "user",
                });
                await setDoc(doc(db, "usersPosts", res.user.uid), {
                  messages: [],
                });
              }
            );
          }
        );
      } catch (err) {
        console.log(err);
      }
      navigate("/login");
    }
  };
  return (
    <div className="register">
      {/* error */}
      {setError}
      {/* error */}
      <div className="form_container">
        <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
          <div className="wrapper wrapper--w680">
            <div className="card card-4">
              <div className="card-body">
                <div className="logo_container">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSOmXbygKF-nLfSqarAFaUQ-Wo_Em-lGnv2hw8rfELiA&s" />
                  <h2 className="title">Registration Form</h2>
                </div>
                <form onSubmit={(e) => onSubmitRegister(e)}>
                  <div className="row row-space">
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label">
                          Username <span style={{ color: "#F3453F" }}>*</span>
                        </label>
                        <input
                          className="input--style-4"
                          type="text"
                          name="username"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label">
                          Email <span style={{ color: "#F3453F" }}>*</span>
                        </label>
                        <input
                          className="input--style-4"
                          type="email"
                          name="email"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label">
                          Password <span style={{ color: "#F3453F" }}>*</span>
                        </label>
                        <input
                          className="input--style-4"
                          type="text"
                          name="password"
                          minLength={6}
                        />
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label">
                          Password confirm{" "}
                          <span style={{ color: "#F3453F" }}>*</span>
                        </label>
                        <input
                          className="input--style-4"
                          type="text"
                          name="password"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row row-space">
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label">Birthday</label>
                        <div className="input-group-icon">
                          <input
                            className="input--style-4 js-datepicker"
                            type="date"
                            name="birthday"
                          />
                          <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="input-group">
                        <label className="label">
                          Upload image{" "}
                          <span style={{ color: "#F3453F" }}>*</span>
                        </label>
                        <div style={{ display: "flex" }}>
                          <div className="p-t-10">
                            <label htmlFor="file">
                              <UploadOutlined
                                style={{ fontSize: "40px", cursor: "pointer" }}
                              />
                              <input
                                type="file"
                                // accept=".png,.jpeg,.jpg"
                                name="file"
                                id="file"
                                style={{ display: "none" }}
                                onChange={(e) => handleAvtImage(e)}
                              />
                            </label>
                          </div>
                          <img
                            src={AvtImage ? AvtImage.preview : null}
                            style={{
                              width: "50px",
                              height: "50px",
                              marginLeft: "30px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-t-15">
                    <button className="register_btn" type="submit">
                      Register
                    </button>
                  </div>
                  <div style={{ textAlign: "center", marginTop: "30px" }}>
                    <p style={{ fontSize: "0.8rem" }}>
                      You already have an account?{" "}
                      <Link to="/login">Sign in</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/select2/select2.min.js"></script>
        <script src="vendor/datepicker/moment.min.js"></script>
        <script src="vendor/datepicker/daterangepicker.js"></script>
        <script src="js/global.js"></script>
      </div>
    </div>
  );
}

export default Register;
