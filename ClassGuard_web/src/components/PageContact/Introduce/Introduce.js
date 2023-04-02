import React,{useState} from "react";
import IntroduceItem from './IntroduceItem'
function Introduce() {
  const [timelineData, setTimelineData] = useState([
    {
      text: "AI Engineer",
      date: "12/ 09/ 2000",
      category: {
        tag: "Mentor",
        color: "#018f69",
      },
      link: {
        url: "https://www.linkedin.com/in/whoisltd/",
        text: "Lê Tiến Đạt",
      },
    },
    {
      text: "Desire to create useful projects for the community",
      date: "22/ 09/ 2003",
      category: {
        tag: "CoreTeam",
        color: "#FFDB14",
      },
      link: {
        url: "https://www.linkedin.com/in/nguy%E1%BB%85n-quang-%C4%91%E1%BA%A1o-361a72255/",
        text: "Nguyễn Quang Đạo",
      },
    },
    {
      text: "Create a lot of value for the community",
      date: "30/ 07/ 2002",
      category: {
        tag: "Leader",
        color: "#e17b77",
      },
      link: {
        url: "https://www.linkedin.com/in/newking2002/",
        text: "Ngụy Hồng Long",
      },
    },
    {
      text: "Become a great programmer",
      date: "29/ 11/ 2003",
      category: {
        tag: "CoreTeam",
        color: "#1DA1F2",
      },
      link: {
        url: "https://www.linkedin.com/in/c%C6%B0%E1%BB%9Dng-tr%C6%B0%C6%A1ng-v%C4%83n-24943626a/?fbclid=IwAR30m5b_kCQ8yN_aFr_7S7hxLB1_cvzK8aO5aSherOI_wMqSiKm6TxOZjDo",
        text: "Trương Văn Cường",
      },
    },
   
    
  ]);
  return (
    <div style={{marginTop:'200px', marginBottom:'-100px'}}>
    {  timelineData.length > 0 && (
      <div className="timeline-container">
        {timelineData.map((data, idx) => (
          <IntroduceItem data={data} key={idx} />
        ))}
      </div>
      )}
    </div>
  );
}
export default Introduce