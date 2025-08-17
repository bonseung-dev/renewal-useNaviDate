import LoginPrompt from '@/components/features/date-calendar/login-prompt';
import MyPageTabs from '@/components/features/my-page/my-page-tabs';
import MyProfileHeader from '@/components/features/my-page/my-profile-header';
import { getServerCookie, getUserIdFromToken } from '@/lib/utils/cookes.utils';

const page = async () => {
  const token = getServerCookie('access_token');
  if (!token) {
    return <LoginPrompt authStatus="unauthenticated" />;
  }
  const userId = await getUserIdFromToken();

  return (
    <section aria-labelledby="calendar-heading" className="px-4">
      <h1 id="calendar-heading" className="sr-only">
        마이페이지
      </h1>

      <MyProfileHeader userId={Number(userId)} token={token} />

      <div className="mt-[38px]">
        <MyPageTabs userId={Number(userId)} token={token} />
      </div>
    </section>
  );
};

export default page;
