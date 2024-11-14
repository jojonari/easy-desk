import { useState, useEffect } from "react";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState({
    retirement: false,
    converter: false,
    memo: false,
  });

  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem("openMenu"));
    if (storedState) {
      setOpenMenu(storedState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("openMenu", JSON.stringify(openMenu));
  }, [openMenu]);

  const handleMenuToggle = (menu) => {
    setOpenMenu((prevState) => {
      const newState = { ...prevState, [menu]: !prevState[menu] };
      if (menu !== "retirement") newState.retirement = false;
      if (menu !== "converter") newState.converter = false;
      if (menu !== "memo") newState.memo = false;
      return newState;
    });
  };

  return (
    <nav className="h-screen max-h-screen overflow-y-auto">
      <ul className="space-y-4">
        <li>
          <a
            href="#"
            className="block font-bold hover:text-gray-400 p-2 flex items-center justify-between"
            onClick={() => handleMenuToggle("retirement")}
          >
            경제적 자유
            <span>
              {openMenu.retirement ? (
                <span className="transform rotate-90">-</span> /* 열림 상태: 오른쪽 화살표 */
              ) : (
                <span className="transform rotate-180">+</span> /* 닫힘 상태: 아래 화살표 */
              )}
            </span>
          </a>
          {openMenu.retirement && (
            <ul className="space-y-2 pl-4">
              <li>
                <a href="/retirement/capital" className="block hover:text-gray-400 p-2">
                    은퇴자금 계산기
                </a>
                <hr className="border-gray-500" />
              </li>
              <li>
                <a href="/retirement/rate" className="block hover:text-gray-400 p-2">
                    이율(배당률) 계산기
                </a>
                <hr className="border-gray-500" />
              </li>
              <li>
                <a href="/retirement/expense" className="block hover:text-gray-400 p-2">
                    생활비 계산기
                </a>
                <hr className="border-gray-500" />
              </li>
              <li>
                <a href="/retirement/compound" className="block hover:text-gray-400 p-2">
                    복리 계산기
                </a>
                <hr className="border-gray-500" />
              </li>
              <li>
                <a href="/retirement/double" className="block hover:text-gray-400 p-2">
                    원금2배 계산기
                </a>
                <hr className="border-gray-500" />
              </li>
            </ul>
          )}
        </li>
        <hr className="border-gray-500" />

        <li>
          <a
            href="#"
            className="block font-bold hover:text-gray-400 p-2 flex items-center justify-between"
            onClick={() => handleMenuToggle("converter")}
          >
            변환기
            <span>
              {openMenu.converter ? (
                <span className="transform rotate-90">-</span> /* 열림 상태: 오른쪽 화살표 */
              ) : (
                <span className="transform rotate-180">+</span> /* 닫힘 상태: 아래 화살표 */
              )}
            </span>
          </a>
          {openMenu.converter && (
            <ul className="space-y-2 pl-4">
              <li>
                <a
                  href="/currency-converter"
                  className="block hover:text-gray-400 p-2"
                >
                  통화 변환기
                </a>
                <hr className="border-gray-500" />
              </li>
              <li>
                <a
                  href="/unit-converter"
                  className="block hover:text-gray-400 p-2"
                >
                  단위 변환기
                </a>
                <hr className="border-gray-500" />
              </li>
              <li>
                <a
                  href="/date-converter"
                  className="block hover:text-gray-400 p-2"
                >
                  날짜 변환기
                </a>
                <hr className="border-gray-500" />
              </li>
            </ul>
          )}
        </li>
        <hr className="border-gray-500" />

        <li>
          <a
            href="#"
            className="block font-bold hover:text-gray-400 p-2 flex items-center justify-between"
            onClick={() => handleMenuToggle("memo")}
          >
            메모
            <span>
              {openMenu.memo ? (
                <span className="transform rotate-90">-</span> /* 열림 상태: 오른쪽 화살표 */
              ) : (
                <span className="transform rotate-180">+</span> /* 닫힘 상태: 아래 화살표 */
              )}
            </span>
          </a>
          {openMenu.memo && (
            <ul className="space-y-2 pl-4">
              <li>
                <a href="/notes" className="block hover:text-gray-400 p-2">
                  메모 리스트
                </a>
              </li>
              <li>
                <a href="/reminders" className="block hover:text-gray-400 p-2">
                  리마인더
                </a>
              </li>
            </ul>
          )}
        </li>
        <hr className="border-gray-500" />

        <li>
          <a href="/calculator" className="block hover:text-gray-400 p-2"
            onClick={() => handleMenuToggle("")}
          >
            계산기
          </a>
        </li>
        <hr className="border-gray-500" />

        <li>
          <a href="/contact" className="block hover:text-gray-400 p-2">
            문의하기
          </a>
        </li>
      </ul>
      {/* 광고 */}
      <div className="fixed bottom-4 left-0 right-0">
        <iframe 
        src="https://ads-partners.coupang.com/widgets.html?id=820115&template=carousel&trackingCode=AF8867686&subId=&width=680&height=140&tsource=" 
        width="100%" 
        height="140"
        className="mx-auto"
        ></iframe>
    </div>
    </nav>
  );
}
