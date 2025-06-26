const AnalysisIcon = () => {
  return (
    <div className="relative w-[38px] h-[38px] mr-3">
      {/* 흰색 도넛 선 */}
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0"
      >
        <path
          d="M35.3503 24.4833C34.29 26.9908 32.6317 29.2004 30.5201 30.9188C28.4086 32.6373 25.9083 33.8124 23.2377 34.3413C20.5672 34.8702 17.8077 34.7369 15.2006 33.953C12.5935 33.1691 10.2181 31.7585 8.28205 29.8444C6.34604 27.9304 4.90837 25.5713 4.09474 22.9733C3.28111 20.3753 3.11628 17.6175 3.61468 14.9411C4.11307 12.2646 5.25951 9.75105 6.95376 7.62006C8.64801 5.48906 10.8385 3.80554 13.3337 2.71667"
          stroke="#F5FBFF"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* 파란 파이 조각 */}
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[1px] left-[18px]"
      >
        <path
          d="M17.0017 18.5892C17.9217 18.5892 18.6767 17.8409 18.585 16.9259C18.2008 13.0995 16.5051 9.52373 13.7855 6.80476C11.066 4.08579 7.4898 2.39095 3.66333 2.00756C2.74667 1.91589 2 2.67089 2 3.59089V16.9242C2 17.3662 2.1756 17.7902 2.48816 18.1027C2.80072 18.4153 3.22464 18.5909 3.66667 18.5909L17.0017 18.5892Z"
          stroke="#7BB4DD"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default AnalysisIcon;
