import React, { useState, useEffect } from "react";
import "./Dashboard.scss";
import {
  UilThumbsUp,
  UilComments,
  UilBars,
  UilSearch,
  UilTachometerFastAlt,
  UilClockThree,
} from "@iconscout/react-unicons";
import {
  SolutionOutlined,
  DislikeOutlined,
  UserOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Modal, Avatar, Tooltip } from "antd";
import {
  doc,
  onSnapshot,
  collection,
  getDocs,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db, auth } from "../../Firebase/Config";
import TimeAgo from "react-timeago";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/userContext";
import NavAdmin from "../NavAdmin/NavAdmin";
function Dashboard() {
  const { user } = useUserContext();
  const navigateSignout = useNavigate();
  const [addClass, setAddClass] = useState("open");
  const [isModalOpenSignOuts_admin, setIsModalOpenSignOut_admin] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);
  const [countComments, setCountComments] = useState("0");
  const [countDisLikes, setCountDisLikes] = useState("0");
  const [countLikes, setCountLikes] = useState("0");
  const [dataUser, setDataUser] = useState([]);
  const [posts, setPosts] = useState([]);
  //menu Toggle
  const modeToggle = () => {
    if (addClass === "open") {
      setAddClass("close");
    } else {
      setAddClass("open");
    }
  };
  ///sign out///
  // isModalOpenSignOut
  const admin_isModalOpenSignOut = () => {
    setIsModalOpenSignOut_admin(true);
  };
  const admin_handleOkSignOut = () => {
    auth.signOut();
    navigateSignout("/login");
  };
  const admin_handleCancelSignOut = () => {
    setIsModalOpenSignOut_admin(false);
  };
  // total Posts
  useEffect(() => {
    const unSub = onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => {
      unSub();
    };
  }, []);
  //Total dislike like comment
  useEffect(() => {
    let sumCm = 0;
    let sumDisLikes = 0;
    let sumLikes = 0;
    for (let i = 0; i < posts.length; i++) {
      onSnapshot(
        collection(db, "posts", posts[i].id, "comments"),
        // eslint-disable-next-line no-loop-func
        (snapshot) => {
          sumCm += snapshot.docs.length;
          setCountComments(sumCm);
        }
      );
      onSnapshot(
        collection(db, "posts", posts[i].id, "dislikes"),
        // eslint-disable-next-line no-loop-func
        (snapshot) => {
          sumDisLikes += snapshot.docs.length;
          setCountDisLikes(sumDisLikes);
        }
      );
      // eslint-disable-next-line no-loop-func
      onSnapshot(collection(db, "posts", posts[i].id, "likes"), (snapshot) => {
        sumLikes += snapshot.docs.length;
        setCountLikes(sumLikes);
      });
    }
  }, [posts]);

  useEffect(() => {
    getDocs(collection(db, "user")).then((snapshot) => {
      let arrData = [];
      snapshot.forEach((s) => {
        arrData.push(s.data());
      });
      setDataUser(arrData);
    });
  }, []);
  //ModalEditUser
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [typeUser, setTypeUser] = useState("user");
  const [idEditUser, setIdEditUser] = useState("");

  const showModalEditUser = (data) => {
    setOpen(true);
    setIdEditUser(data);
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    await updateDoc(doc(db, "user", idEditUser), {
      roles: typeUser,
    });
    setOpen(false);
    setConfirmLoading(false);
    setTypeUser("user");
    if (checkDelete) {
      await deleteDoc(doc(db, "user", idEditUser));
    }
    window.location.reload();
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div id="AdMin">
      <NavAdmin
        admin_isModalOpenSignOut={admin_isModalOpenSignOut}
        admin_handleOkSignOut={admin_handleOkSignOut}
        admin_handleCancelSignOut={admin_handleCancelSignOut}
        isModalOpenSignOuts_admin={isModalOpenSignOuts_admin}
        addClass={addClass}
      />
      {/* <!-- dashboard --> */}
      <section className="dashboard">
        {/* <!-- top --> */}
        <div className="top">
          <UilBars className="i UilBars" onClick={modeToggle} />
          <div className="search-box">
            <UilSearch className="i" />
            <input type="text" placeholder="Search here..." />
          </div>
          <Avatar className="img_Avta" src={user.photoURL}>
            {user.photoURL
              ? user.photoURL
              : user.displayName}
          </Avatar>
        </div>
        {/* <!-- dash-content --> */}
        <div className="dash-content">
          <div className="overview">
            <div className="title">
              <UilTachometerFastAlt className="i" />
              <span className="text">Dashboard</span>
            </div>

            <div className="boxes">
              <div className="box box1">
                <UilThumbsUp className="i" />
                <span className="text">Total Likes</span>
                <span className="number">{countLikes}</span>
              </div>
              <div className="box box2">
                <DislikeOutlined style={{ fontSize: "35px" }} className="i" />
                <span className="text">Total Dislike</span>
                <span className="number">{countDisLikes}</span>
              </div>
              <div className="box box3">
                <UilComments className="i" />
                <span className="text">Total Comments</span>
                <span className="number">{countComments}</span>
              </div>
              <div className="box box_50 box4">
                <SolutionOutlined style={{ fontSize: "35px" }} className="i" />
                <span className="text">Total Posts</span>
                <span className="number">{posts.length}</span>
              </div>
              <div className="box box_50 box5">
                <UserOutlined style={{ fontSize: "35px" }} className="i" />
                <span className="text">Total User</span>
                <span className="number">{dataUser.length}</span>
              </div>
            </div>
          </div>

          <div className="activity">
            <div className="title">
              <UilClockThree className="i" />
              <span className="text">Recent Activity</span>
            </div>

            <div className="activity-data">
              <div>
                <span className="data-title">Name</span>
                <div className="data names">
                  {dataUser.map((data) => (
                    <span key={data.uid} style={{ cursor: "pointer" }} className="data-list" onClick={() => {
                      showModalEditUser(data.uid);
                    }}>
                      <Tooltip title={data.displayName}>
                        {data.displayName}
                      </Tooltip>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="data-title">Email</span>
                <div className="data email">
                  {dataUser.map((data) => (
                    <span key={data.uid} style={{ cursor: "pointer" }} className="data-list" onClick={() => {
                      showModalEditUser(data.uid);
                    }}>
                      <Tooltip title={data.email}>{data.email}</Tooltip>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="data-title">Joined</span>
                <div className="data joined">
                  {dataUser.map((data) => (
                    <span key={data.uid} className="data-list">
                      <TimeAgo date={data?.timestamp?.toDate()} />
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="data-title">Type</span>
                <div className="data type">
                  {dataUser.map((data) => (
                    <span
                      key={data.uid}
                      className="data-list"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        showModalEditUser(data.uid);
                      }}
                    >
                      {data.roles}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modal edit user */}
      <Modal
        title="Edit user"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>

          <div className="Edit_type">
            <p>Type</p>
            <select
              value={typeUser}
              onChange={(e) => setTypeUser(e.target.value)}
              style={{
                padding: "5px 20px",
                borderRadius: "8px",
                userSelect: "none",
              }}
            >
              <option>user</option>
              <option>admin</option>
            </select>
          </div>
          <div>
            <button
              onClick={() => setCheckDelete(!checkDelete)}
              style={{ backgroundColor: '#C7372F', color: '#fff', padding: '6px 10px', border: 'none', borderRadius: '8px', marginTop: '15px', cursor: 'pointer' }}>
              Delete
            </button>
            {checkDelete ?
              <CheckOutlined style={{ color: 'red', fontWeight: 'bold', marginLeft: '12px' }} />
              :
              ''
            }
          </div>
        </div>

      </Modal>
      {/* Modal edit user */}
    </div>
  );
}

export default Dashboard;

