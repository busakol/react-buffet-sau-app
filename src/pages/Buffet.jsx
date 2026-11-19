import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import eat from "./../images/eat.png";
import Footer from "./../components/Footer";

export default function Buffet() {
  // สร้าง state สำหรับจัดการกับข้อมูลบน component ---------------------------
  const [adult, setAdult] = useState("");
  const [child, setChild] = useState("");
  const [drink, setDrink] = useState("refill"); // refill = น้ำรีฟิล, bottle = เครื่องดื่มแบบขวด
  const [water, setWater] = useState("");
  const [soda, setSoda] = useState("");
  const [discount, setDiscount] = useState("0");
  const [total, setTotal] = useState("0.00");

  // ฟังก์ชันเลือกประเภทเครื่องดื่ม --------------------------------------------
  const handleDrinkChange = (e) => {
    setDrink(e.target.value);

    // ถ้าเลือกน้ำรีฟิล จะป้อนน้ำเปล่า/น้ำอัดลมไม่ได้ จึงเคลียร์ค่าทิ้ง
    if (e.target.value === "refill") {
      setWater("");
      setSoda("");
    }
  };

  // ฟังก์ชันคำนวณค่าอาหารบุฟเฟต์ ---------------------------------------------
  const handleCalBuffetClick = (e) => {
    e.preventDefault();

    // Validate UI ต้องป้อนจำนวนผู้ใหญ่ หรือจำนวนเด็ก อย่างน้อย 1 ช่อง
    if (adult === "" && child === "") {
      Swal.fire({
        icon: "warning",
        title: "คำเตือน",
        text: "กรุณาป้อนจำนวนผู้ใหญ่ หรือจำนวนเด็ก",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    // แปลงเป็นตัวเลขก่อนคำนวณ (ช่องที่ไม่ได้ป้อนถือว่าเป็น 0)
    const a = Number(adult);
    const c = Number(child);
    const w = Number(water);
    const s = Number(soda);
    const d = Number(discount);

    // จำนวนต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป
    if (!Number.isInteger(a) || !Number.isInteger(c) || a < 0 || c < 0) {
      Swal.fire({
        icon: "warning",
        title: "ข้อมูลไม่ถูกต้อง",
        text: "จำนวนผู้ใหญ่และจำนวนเด็กต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    if (
      drink === "bottle" &&
      (!Number.isInteger(w) || !Number.isInteger(s) || w < 0 || s < 0)
    ) {
      Swal.fire({
        icon: "warning",
        title: "ข้อมูลไม่ถูกต้อง",
        text: "จำนวนน้ำเปล่าและน้ำอัดลมต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    // 1. ค่าอาหาร = ผู้ใหญ่ x 299 + เด็ก x 89
    const food = a * 299 + c * 89;
    // 2. หักส่วนลด (ลดเฉพาะค่าอาหาร ไม่รวมเครื่องดื่ม)
    const foodAfterDiscount = food - (food * d) / 100;
    // 3. ค่าเครื่องดื่ม
    let drinkCost;
    if (drink === "refill") {
      drinkCost = (a + c) * 29; // น้ำรีฟิล คนละ 29 บาท (ผู้ใหญ่และเด็ก)
    } else {
      drinkCost = w * 10 + s * 25; // น้ำเปล่าขวดละ 10, น้ำอัดลมขวดละ 25
    }
    // 4. ยอดชำระทั้งหมด
    const result = foodAfterDiscount + drinkCost;

    setTotal(
      result.toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  // ฟังก์ชันรีเซ็ตค่าบนหน้าจอ ------------------------------------------------
  const handleResetClick = (e) => {
    e.preventDefault();

    // เคลียร์หน้าจอ คือ ทุกอย่างกลับเป็นค่าเริ่มต้น
    setAdult("");
    setChild("");
    setDrink("refill");
    setWater("");
    setSoda("");
    setDiscount("0");
    setTotal("0.00");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 font-kanit">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl mx-auto flex flex-col items-center p-8">
        {/* แสดงชื่อหน้าจอและรูป */}
        <p className="font-bold text-2xl">Buffet Calculator</p>
        <p className="text-gray-500">คำนวณค่าอาหารบุฟเฟต์</p>
        <img src={eat} alt="Buffet" className="w-20 mt-5" />

        {/* ส่วนของฟอร์ม สำหรับป้อน เลือก คลิก */}
        <form className="w-full mt-8 flex flex-col">
          <label className="text-sm">จำนวนผู้ใหญ่ (คนละ 299 บาท)</label>
          <input
            type="number"
            name="adult"
            id="adult"
            min="0"
            value={adult}
            onChange={(e) => setAdult(e.target.value)}
            className="border border-gray-300 p-2 rounded-md mt-1"
          />

          <label className="text-sm mt-3">จำนวนเด็ก (คนละ 89 บาท)</label>
          <input
            type="number"
            name="child"
            id="child"
            min="0"
            value={child}
            onChange={(e) => setChild(e.target.value)}
            className="border border-gray-300 p-2 rounded-md mt-1"
          />

          {/* ส่วนเลือกเครื่องดื่ม */}
          <fieldset className="border border-gray-200 rounded-lg p-3 mt-5">
            <legend className="text-sm px-1">เครื่องดื่ม</legend>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="drink"
                value="refill"
                checked={drink === "refill"}
                onChange={handleDrinkChange}
              />
              น้ำรีฟิล คนละ 29 บาท (ผู้ใหญ่และเด็ก)
            </label>
            <label className="flex items-center gap-2 cursor-pointer mt-2">
              <input
                type="radio"
                name="drink"
                value="bottle"
                checked={drink === "bottle"}
                onChange={handleDrinkChange}
              />
              เครื่องดื่มแบบขวด
            </label>

            <label className="text-sm mt-3 block">น้ำเปล่า (ขวดละ 10 บาท)</label>
            <input
              type="number"
              name="water"
              id="water"
              min="0"
              value={water}
              disabled={drink === "refill"}
              onChange={(e) => setWater(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />

            <label className="text-sm mt-3 block">น้ำอัดลม (ขวดละ 25 บาท)</label>
            <input
              type="number"
              name="soda"
              id="soda"
              min="0"
              value={soda}
              disabled={drink === "refill"}
              onChange={(e) => setSoda(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </fieldset>

          {/* ส่วนเลือกบัตรส่วนลด */}
          <label className="text-sm mt-5">บัตรส่วนลด</label>
          <select
            name="discount"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="border border-gray-300 p-2 rounded-md mt-1 cursor-pointer"
          >
            <option value="0">ไม่มีส่วนลด</option>
            <option value="10">ส่วนลด 10%</option>
            <option value="15">ส่วนลด 15%</option>
            <option value="20">ส่วนลด 20%</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            ลดเฉพาะค่าอาหารทั้งหมด ไม่รวมเครื่องดื่ม
          </p>

          {/* ปุ่มคำนวณ และปุ่มรีเซ็ต */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleCalBuffetClick}
              className="w-full bg-indigo-600 p-2 rounded-md text-white font-bold cursor-pointer hover:bg-indigo-700"
            >
              คำนวณ
            </button>
            <button
              onClick={handleResetClick}
              className="w-full bg-red-500 p-2 rounded-md text-white font-bold cursor-pointer hover:bg-red-600"
            >
              รีเซ็ต
            </button>
          </div>
        </form>

        {/* ส่วนแสดงผล */}
        <div className="w-full bg-indigo-50 rounded-lg p-4 mt-5 text-center">
          ยอดชำระทั้งหมด:{" "}
          <span className="text-indigo-600 font-bold text-xl">{total}</span> บาท
        </div>

        {/* ส่วนลิงก์กลับไปหน้าหลัก */}
        <Link
          to="/"
          className="w-full bg-gray-400 mt-3 p-2 rounded-md text-black font-bold text-center hover:bg-gray-500"
        >
          กลับหน้าหลัก
        </Link>
      </div>

      {/* แสดงส่วน Footer */}
      <Footer />
    </div>
  );
}
