"use client";

import Link from "next/link";
// Define the props type for MenuList
interface MenuItem {
  href: string;
  label: string;
  description: string;
  count: number;
  likes: number;
}

interface MenuListProps {
  title: string;
  menu: MenuItem[];
}

const MenuList: React.FC<MenuListProps> = ({ title, menu }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mt-8 mb-4">{title}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {menu.map((item) => (
          <li key={item.href} className="p-4 border border-gray-200 bg-gray-50 rounded-lg shadow-sm hover:shadow-md">
            <Link href={item.href}>
              <h2 className="text-lg font-semibold">{item.label}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-blue-500 text-lg font-bold">
                  {item.count.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">❤️ {item.likes}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function HOME() {
  const retirementMenu = [
    {
      href: "/retirement/capital",
      label: "은퇴자금 계산기",
      description: "은퇴 후 필요 자금을 계산합니다.",
      count: 12345,
      likes: 87,
    },
    {
      href: "/retirement/rate",
      label: "수익률 계산기",
      description: "투자 수익률을 계산합니다.",
      count: 8765,
      likes: 54,
    },
    {
      href: "/retirement/expense",
      label: "은퇴생활비 계산기",
      description: "은퇴 후 월간 생활비를 추산합니다.",
      count: 2345,
      likes: 32,
    },
    {
      href: "/retirement/compound",
      label: "복리 계산기",
      description: "복리 효과를 계산합니다.",
      count: 6543,
      likes: 48,
    },
    {
      href: "/retirement/double",
      label: "기간/수익률 계산기",
      description: "자산 두 배가 되는 기간이나 수익률을 계산합니다.",
      count: 4321,
      likes: 29,
    },
    {
      href: "/retirement/fourPercentRule",
      label: "4%룰 인출 계산기",
      description: "4%룰에 따라 연간 인출 금액을 계산합니다.",
      count: 7890,
      likes: 61,
    },
    {
      href: "/retirement/family",
      label: "가족 생애주기",
      description: "가족 생애주기 및 재정 계획을 탐색합니다.",
      count: 3456,
      likes: 19,
    },
  ];

  const converterMenu = [
    {
      href: "/converter/area",
      label: "넓이 변환기",
      description: "제곱미터(m²)와 평수를 상호 변환합니다.",
      count: 45678,
      likes: 210,
    },
    {
      href: "/converter/length",
      label: "길이 변환기",
      description: "킬로미터(km)와 마일을 상호 변환합니다.",
      count: 34567,
      likes: 187,
    },
    {
      href: "/converter/weight",
      label: "무게 변환기",
      description: "킬로그램(kg)과 파운드를 상호 변환합니다.",
      count: 23456,
      likes: 145,
    },
  ];

  return (
    <div className="p-4">
      {/* Desktop View */}
      <div className=" md:block">
        <MenuList title="은퇴 계산기" menu={retirementMenu} />
        <div className="pt-4 flex justify-between items-center">
            <iframe
            src="https://ads-partners.coupang.com/widgets.html?id=820115&template=carousel&trackingCode=AF8867686&subId=&width=680&height=140&tsource="
            width="100%"
            height="140"
            className="mx-auto"
            title="Advertisement"
            ></iframe>
        </div>
        <MenuList title="변환기" menu={converterMenu} />
        <div className="pt-4 flex justify-between items-center">
            <iframe
            src="https://ads-partners.coupang.com/widgets.html?id=820115&template=carousel&trackingCode=AF8867686&subId=&width=680&height=140&tsource="
            width="100%"
            height="140"
            className="mx-auto"
            title="Advertisement"
            ></iframe>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-2 border-t border-gray-200 md:hidden">
        <div className="flex justify-between text-sm text-gray-600">
          <Link href="/calendar" className="flex flex-col items-center">
            📅 <span>캘린더</span>
          </Link>
          <Link href="/calculator" className="flex flex-col items-center">
            🧮 <span>계산기</span>
          </Link>
          <Link href="/dictionary" className="flex flex-col items-center">
            📖 <span>사전</span>
          </Link>
          <Link href="/mypage" className="flex flex-col items-center">
            👤 <span>마이페이지</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
