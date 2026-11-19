import bf from "./../images/bf.jpeg";
import eat from "./../images/eat.png";
import CardMenu from "./../components/CardMenu";
import { Link } from "react-router-dom";
import Footer from "./../components/Footer";

export default function Home() {
  return (
    <>
      <div className="w-full flex flex-col items-center mt-20">
        {/* แสดงรูป */}
        <img src={bf} alt="Buffet" className="w-30" />

        {/* แสดงชื่อเว็บ */}
        <p className="font-kanit text-3xl font-bold mt-10">
          เครื่องมือคำนวณออนไลน์
        </p>
        <p className="font-itim text-gray-600 text-xl">
          เลือกการคำนวณที่คุณต้องการจากรายการด้านล่าง
        </p>

        {/* แสดงปุ่มเมนู */}
        <div className="flex gap-10 mt-15">
          <Link to="/buffet">
            <CardMenu
              showImg={eat}
              showTitle="BUFFET (ค่าอาหารบุฟเฟต์)"
              showDetail="คำนวณค่าอาหารบุฟเฟต์ เครื่องดื่ม และส่วนลด"
            />
          </Link>
        </div>

        {/* แสดงส่วน Footer */}
        <Footer />
      </div>
    </>
  );
}
