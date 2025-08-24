import NotificationTabs from '@/components/features/notice/notification-tabs';

const page = () => {
  return (
    <section aria-labelledby="calendar-heading" className="px-4">
      <h1 id="calendar-heading" className="sr-only">
        알림
      </h1>

      <h1
        id="calendar-heading"
        className="text-b-h0 font-bold text-skin1 mb-4 px-4"
      >
        알림
      </h1>
      <NotificationTabs />
    </section>
  );
};

export default page;
