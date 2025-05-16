import styles from "../AboutUs/AboutUs.module.css";
import ScrollToTop from "../../hooks/ScrollToTop.jsx";
import ashwin from "../../assets/images/AboutUs/ashwin.jpg";
import ajitesh from "../../assets/images/AboutUs/ajitesh.jpg";
import abhishek from "../../assets/images/AboutUs/abhishek.jpg";
import zainab from "../../assets/images/AboutUs/zainab.jpg";
import aman from "../../assets/images/AboutUs/aman.jpg";
import ashutosh from "../../assets/images/AboutUs/ashutosh2.jpeg";
import logo from "../../assets/images/AboutUs/logo.jpeg";

const HindiAboutUs = () => {
  const teamMembers = [
    {
      name: "जैनब अंसारी",
      role: "मुख्य कार्यकारी अधिकारी",
      image: zainab,
      description: "नीडस्टेशन के रणनीतिक दृष्टिकोण और समग्र संचालन का नेतृत्व करती हैं, सुनिश्चित करती हैं कि हम गुणवत्तापूर्ण सेवा का वादा पूरा करें।",
    },
    {
      name: "अश्विन सोनी",
      role: "व्यापार प्रमुख",
      image: ashwin,
      description: "ग्राहक अनुभव को बेहतर बनाने और सेवा संबंधी मुद्दों को हल करने पर ध्यान केंद्रित करते हैं ताकि अधिकतम ग्राहक संतुष्टि प्राप्त की जा सके।",
    },
    {
      name: "अभिषेक गुप्ता",
      role: "मुख्य तकनीकी अधिकारी",
      image: abhishek,
      description: "हमारे प्लेटफॉर्म के तकनीकी बुनियादी ढांचे और विकास की देखरेख करते हैं, जिससे सेवा बुकिंग सहज और कुशल बनती है।",
    },
    {
      name: "आशुतोष गर्ग",
      role: "परिचालन प्रबंधक",
      image: ashutosh,
      description: "विश्वसनीय और उच्च गुणवत्ता वाली सेवा प्रदान करने के लिए दैनिक संचालन और सेवा प्रदाता संबंधों का प्रबंधन करते हैं।",
    },
    {
      name: "अमन सोनी",
      role: "विपणन निदेशक",
      image: aman,
      description: "हमारी पहुंच का विस्तार करने और हमारी सेवाओं के लाभों को बताने के लिए मार्केटिंग रणनीतियों को विकसित और लागू करते हैं।",
    },
    {
      name: "अजितेश त्रिपाठी",
      role: "मानव संसाधन प्रबंधक",
      image: ajitesh,
      description: "सेवा गुणवत्ता मानकों को बनाए रखने के लिए हमारे सेवा प्रदाताओं की टीम की भर्ती, प्रशिक्षण और प्रबंधन के लिए जिम्मेदार हैं।",
    },
  ];

  // Service categories
  const serviceCategories = [
    {
      title: "बुजुर्गों की देखभाल",
      icon: "",
      services: [
        "देखभालकर्ता",
        "लकवा देखभालकर्ता",
        "प्रसवोत्तर देखभालकर्ता",
        "नर्स",
        "स्वास्थ्य जांच सेवाएं",
        "बेबी सिटर",
      ],
    },
    {
      title: "बुनियादी आवश्यकताएं",
      icon: "",
      services: ["इलेक्ट्रीशियन", "प्लंबर", "पानी की आपूर्ति"],
    },
    {
      title: "घरेलू सेवाएं",
      icon: "",
      services: ["खाना बनाना", "सफाई", "कपड़े धोना"],
    },
  ];

  return (
    <>
      <ScrollToTop />
      <main className={`${styles["about-main"]} page-content-spacing`}>
        <div className={styles["container"]}>
          {/* Vision & Mission Section */}
          <section className={styles["vision-section"]}>
            <h2>नीडस्टेशन के बारे में</h2>
            <div className={styles["vision-content"]}>
              <div className={styles["vision-text"]}>
                <h3>हमारा दृष्टिकोण</h3>
                <p>
                  एक ऐसा प्लेटफॉर्म बनाना जो घरों को विश्वसनीय और सत्यापित सेवा प्रदाताओं से जोड़ता है, जिससे सभी के लिए दैनिक जीवन अधिक सुविधाजनक और प्रबंधनीय बनता है।
                </p>
                
                <h3>हमारा मिशन</h3>
                <p>
                  हम एक सुरक्षित, विश्वसनीय और उपयोगकर्ता-अनुकूल प्लेटफॉर्म प्रदान करके सेवा खोजने वालों और प्रदाताओं के बीच की खाई को पाटने का लक्ष्य रखते हैं जो आवश्यक घरेलू जरूरतों और बुजुर्गों की देखभाल सेवाओं को संबोधित करता है।
                </p>
              </div>
              <div className={styles["vision-image"]}>
                <div className={styles["logo-container"]}>
                  <img 
                    src={logo} 
                    alt="नीडस्टेशन लोगो" 
                    className={styles["logo-image"]} 
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className={styles["services-section"]}>
            <h2>हमारी सेवाएं</h2>
            <p className={styles["section-description"]}>
              नीडस्टेशन पर, हम आपकी रोजमर्रा की जरूरतों को पूरा करने और आपके प्रियजनों के लिए विशेष देखभाल प्रदान करने के लिए डिज़ाइन की गई सेवाओं की एक व्यापक श्रृंखला प्रदान करते हैं।
            </p>
            
            <div className={styles["service-categories"]}>
              {serviceCategories.map((category, index) => (
                <div key={index} className={styles["service-category"]}>
                  <div className={styles["category-header"]}>
                    <span className={styles["category-icon"]}>{category.icon}</span>
                    <h3>{category.title}</h3>
                  </div>
                  <ul className={styles["service-list"]}>
                    {category.services.map((service, sIndex) => (
                      <li key={sIndex}>{service}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className={styles["team-section"]}>
            <h2>हमारी टीम से मिलें</h2>
            <p className={styles["section-description"]}>
              हमारे समर्पित पेशेवरों की टीम आपकी घरेलू जरूरतों को पूरा करने के लिए उच्चतम गुणवत्ता वाली सेवाएं प्रदान करने के लिए अथक प्रयास करती है।
            </p>
            
            <div className={styles["team-grid"]}>
              {teamMembers.map((member, index) => (
                <div key={index} className={styles["team-member"]}>
                  <div className={styles["member-image"]}>
                    <div 
                      className={styles["placeholder-member-image"]} 
                      style={{backgroundImage: `url(${member.image})`}}
                    >
                      {/* <span>{member.name.charAt(0)}</span> */}
                    </div>
                  </div>
                  <div className={styles["member-info"]}>
                    <h3>{member.name}</h3>
                    <h4>{member.role}</h4>
                    <p>{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Values Section */}
          <section className={styles["values-section"]}>
            <h2>हमारे मूल्य</h2>
            <div className={styles["values-grid"]}>
              <div className={styles["value-item"]}>
                <h3>विश्वास</h3>
                <p>
                  हम सभी सेवा प्रदाताओं को सत्यापित करते हैं ताकि यह सुनिश्चित किया जा सके कि वे विश्वसनीय और भरोसेमंद हैं, जिससे आपको मन की शांति मिलती है।
                </p>
              </div>
              <div className={styles["value-item"]}>
                <h3>गुणवत्ता</h3>
                <p>
                  हम निरंतर निगरानी और प्रतिक्रिया के माध्यम से हम जिन सभी सेवाओं की पेशकश करते हैं, उनमें उच्च मानक बनाए रखने के लिए प्रतिबद्ध हैं।
                </p>
              </div>
              <div className={styles["value-item"]}>
                <h3>सुलभता</h3>
                <p>
                  हमारा प्लेटफॉर्म आवश्यक सेवाओं को सभी के लिए सुलभ बनाने के लिए डिज़ाइन किया गया है, जब और जहां भी उन्हें इसकी आवश्यकता हो।
                </p>
              </div>
              <div className={styles["value-item"]}>
                <h3>सहानुभूति</h3>
                <p>
                  हम दैनिक जीवन की चुनौतियों को समझते हैं और ऐसे समाधान बनाने का प्रयास करते हैं जो वास्तव में आपकी जरूरतों को करुणा के साथ संबोधित करते हैं।
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default HindiAboutUs;
