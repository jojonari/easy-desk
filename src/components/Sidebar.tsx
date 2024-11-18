import { useState, useEffect } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState({
    retirement: false,
    converter: false,
    memo: false,
  });

  // Load openMenu state from localStorage
  useEffect(() => {
    const storedState = localStorage.getItem("openMenu");
    if (storedState) {
      try {
        setOpenMenu(JSON.parse(storedState));
      } catch (error) {
        console.error("Failed to parse stored openMenu state:", error);
      }
    }
  }, []);

  // Save openMenu state to localStorage
  useEffect(() => {
    localStorage.setItem("openMenu", JSON.stringify(openMenu));
  }, [openMenu]);

  // Toggle menu state
  const handleMenuToggle = (menu: keyof typeof openMenu) => {
    setOpenMenu((prevState) => {
      const newState = { ...prevState, [menu]: !prevState[menu] };
      Object.keys(newState).forEach((key) => {
        if (key !== menu) newState[key as keyof typeof openMenu] = false;
      });
      return newState;
    });
  };

  return (
    <nav className="h-screen max-h-screen overflow-y-auto">
      <ul className="space-y-4">
        {/* Retirement Menu */}
        <li>
          <button
            className="block font-bold hover:text-gray-400 p-2 flex items-center justify-between"
            onClick={() => handleMenuToggle("retirement")}
          >
            경제적 자유
            <span>
              {openMenu.retirement ? (
                <span className="transform rotate-90">-</span>
              ) : (
                <span className="transform rotate-180">+</span>
              )}
            </span>
          </button>
          {openMenu.retirement && (
            <ul className="space-y-2 pl-4">
              {[
                { href: "/retirement/capital", label: "은퇴자금 계산기" },
                { href: "/retirement/rate", label: "수익률 계산기" },
                { href: "/retirement/expense", label: "은퇴생활비 계산기" },
                { href: "/retirement/compound", label: "복리 계산기" },
                { href: "/retirement/double", label: "기간/수익률 계산기" },
                { href: "/retirement/fourPercentRule", label: "4%룰 인출 계산기" },
                { href: "/retirement/family", label: "가족 생애주기" },
              ].map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="block hover:text-gray-400 p-2">
                    {item.label}
                  </Link>
                  <hr className="border-gray-500" />
                </li>
              ))}
            </ul>
          )}
        </li>
        <hr className="border-gray-500" />

        {/* Converter Menu */}
        <li>
          <button
            className="block font-bold hover:text-gray-400 p-2 flex items-center justify-between"
            onClick={() => handleMenuToggle("converter")}
          >
            변환기
            <span>
              {openMenu.converter ? (
                <span className="transform rotate-90">-</span>
              ) : (
                <span className="transform rotate-180">+</span>
              )}
            </span>
          </button>
          {openMenu.converter && (
            <ul className="space-y-2 pl-4">
              {[
                { href: "/converter/area", label: "넓이 변환기" },
                { href: "/converter/length", label: "길이 변환기" },
                { href: "/converter/weight", label: "무게 변환기" },
              ].map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="block hover:text-gray-400 p-2">
                    {item.label}
                  </Link>
                  <hr className="border-gray-500" />
                </li>
              ))}
            </ul>
          )}
        </li>
        <hr className="border-gray-500" />

        {/* Calculator */}
        <li>
          <Link href="/calculator" className="block hover:text-gray-400 p-2">
            계산기
          </Link>
        </li>
      </ul>

      {/* 광고 */}
      <div className="fixed bottom-4 left-0 right-0">
        <iframe
          src="https://ads-partners.coupang.com/widgets.html?id=820115&template=carousel&trackingCode=AF8867686&subId=&width=680&height=140&tsource="
          width="100%"
          height="140"
          className="mx-auto"
          title="Advertisement"
        ></iframe>
      </div>
    </nav>
  );
}
