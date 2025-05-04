import { AnimatedList } from "@/registry/components/animated-list";

interface NotificationData {
  id: number;
  name: string;
  message: string;
  timeAgo: string;
  icon: string;
}

type NotificationProps = {
  notification: NotificationData;
};

export function Notification({ notification }: NotificationProps) {
  return (
    <div className="w-full max-w-[350px] bg-white dark:bg-neutral-950 shadow-xl shadow-neutral-200 dark:shadow-neutral-950/70 rounded-2xl p-3.5 flex items-center gap-4 justify-between border border-neutral-50 dark:border-neutral-900">
      <img
        src={notification.icon}
        alt={notification.name}
        className="w-10 h-10"
      />
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between items-start">
          <span className="font-medium text-sm">{notification.name}</span>
          <span className="text-xs text-neutral-400">
            {notification.timeAgo}
          </span>
        </div>
        <span className="text-sm text-neutral-600 dark:text-neutral-400">
          {notification.message}
        </span>
      </div>
    </div>
  );
}

export default function AnimatedListDemo() {
  const notifications: NotificationData[] = [
    {
      id: 1,
      name: "Location",
      message: "Thomas has arrived home",
      timeAgo: "2h ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-1.png",
    },
    {
      id: 2,
      name: "Fitness Tracker",
      message: "You've reached your daily step goal!",
      timeAgo: "1h ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-2.png",
    },
    {
      id: 3,
      name: "Calendar",
      message: "Meeting with team in 30 minutes",
      timeAgo: "45m ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-3.png",
    },
    {
      id: 4,
      name: "Task Manager",
      message: "3 tasks due today",
      timeAgo: "1d ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-4.png",
    },
    {
      id: 5,
      name: "Health",
      message: "Your heart rate is elevated.",
      timeAgo: "3h ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-5.png",
    },
    {
      id: 6,
      name: "Email",
      message: "New message from your manager",
      timeAgo: "5m ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-6.png",
    },
    {
      id: 7,
      name: "TikTok",
      message: "Your video got 1000 likes!",
      timeAgo: "2d ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-7.png",
    },
    {
      id: 8,
      name: "Grandpa",
      message: "How are you doing, my dear?",
      timeAgo: "1w ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-8.png",
    },
    {
      id: 9,
      name: "Clara",
      message: "Let's meet for coffee tomorrow!",
      timeAgo: "2d ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-9.png",
    },
    {
      id: 10,
      name: "Sarah",
      message: "Did you see the new movie?",
      timeAgo: "4h ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-10.png",
    },
    {
      id: 11,
      name: "Location",
      message: "Thomas has arrived home",
      timeAgo: "2h ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-1.png",
    },
    {
      id: 12,
      name: "Fitness Tracker",
      message: "You've reached your daily step goal!",
      timeAgo: "1h ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-2.png",
    },
    {
      id: 13,
      name: "Calendar",
      message: "Meeting with team in 30 minutes",
      timeAgo: "45m ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-3.png",
    },
    {
      id: 14,
      name: "Task Manager",
      message: "3 tasks due today",
      timeAgo: "1d ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-4.png",
    },
    {
      id: 15,
      name: "Health",
      message: "Your heart rate is elevated.",
      timeAgo: "3h ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-5.png",
    },
    {
      id: 16,
      name: "Email",
      message: "New message from your manager",
      timeAgo: "5m ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-6.png",
    },
    {
      id: 17,
      name: "TikTok",
      message: "Your video got 1000 likes!",
      timeAgo: "2d ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-7.png",
    },
    {
      id: 18,
      name: "Grandpa",
      message: "How are you doing, my dear?",
      timeAgo: "1w ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-8.png",
    },
    {
      id: 19,
      name: "Clara",
      message: "Let's meet for coffee tomorrow!",
      timeAgo: "2d ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-9.png",
    },
    {
      id: 20,
      name: "Sarah",
      message: "Did you see the new movie?",
      timeAgo: "4h ago",
      icon: "https://cdn.badtz-ui.com/components/notification-icons/icon-10.png",
    },
  ];

  return (
    <AnimatedList
      stackGap={20}
      columnGap={85}
      scaleFactor={0.05}
      scrollDownDuration={5}
      formationDuration={1}
    >
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </AnimatedList>
  );
}
