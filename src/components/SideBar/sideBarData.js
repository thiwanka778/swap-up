const sideBarData = [
    {
      title: "Home",
      icon: "bi-house-door-fill",
      path: "/",
    },
    {
      title: "Dashboard",
      icon: "bi-bookmark-dash",
      path: "/dashboard",
    },
    {
      title: "Settings",
      icon: "bi-gear-fill",
      children: [
        {
          title: "Profile",
          icon: "bi-person-fill",
          path: "/profile",
        },
        {
          title: "Account",
          icon: "bi-person-fill",
          path: "/account",
        },
      ],
    },
    {
      title: "Billing",
      icon: "bi-cash",
      children: [
        {
          title: "Profile",
          icon: "bi-person-fill",
          path: "/profile",
        },
        {
          title: "Account",
          icon: "bi-person-fill",
          children: [
            {
              title: "Profile",
              icon: "bi-person-fill",
              path: "/profile",
            },
            {
              title: "Account",
              icon: "bi-person-fill",
              path: "/account",
            },
          ],
        },
      ],
    },
    {
      title: "Documents",
      icon: "bi-file-earmark",
      path: "/documents",
    },
    {
      title: "Messages",
      icon: "bi-envelope-fill",
      path: "/messages",
    },
    {
      title: "Calendar",
      icon: "bi-calendar3",
      path: "/calendar",
    },
    {
      title: "Analytics",
      icon: "bi-bar-chart-fill",
      children: [
        {
          title: "Overview",
          icon: "bi-file-earmark-check",
          path: "/overview",
        },
        {
          title: "Reports",
          icon: "bi-file-earmark-bar-graph",
          path: "/reports",
        },
        {
          title: "Stats",
          icon: "bi-file-earmark-break",
          children:[
            {
                title: "Support",
                icon: "bi-question-circle-fill",
                path: "/support",
              },
              {
                title: "Help Center",
                icon: "bi-question-diamond-fill",
                path: "/help-center",
              },
              {
                title: "Feedback",
                icon: "bi-chat-dots-fill",
                path: "/feedback",
              },
              {
                title: "Privacy",
                icon: "bi-shield-lock-fill",
                path: "/privacy",
              },
              {
                title: "Logout",
                icon: "bi-box-arrow-right",
                children:[
                    {
                        title: "Support",
                        icon: "bi-question-circle-fill",
                        path: "/support",
                      },
                      {
                        title: "Help Center",
                        icon: "bi-question-diamond-fill",
                        path: "/help-center",
                      },
                      {
                        title: "Feedback",
                        icon: "bi-chat-dots-fill",
                        path: "/feedback",
                      },
                      {
                        title: "Privacy",
                        icon: "bi-shield-lock-fill",
                        path: "/privacy",
                      },
                      {
                        title: "Logout",
                        icon: "bi-box-arrow-right",
                        path: "/logout",
                      },
                ],
              },
          ],
        },
      ],
    },
    {
      title: "Tasks",
      icon: "bi-check-circle-fill",
      path: "/tasks",
    },
    {
      title: "Notifications",
      icon: "bi-bell-fill",
      path: "/notifications",
    },
    {
      title: "Contacts",
      icon: "bi-people-fill",
      children: [
        {
          title: "Clients",
          icon: "bi-person-check-fill",
          path: "/clients",
        },
        {
          title: "Employees",
          icon: "bi-person-lines-fill",
          path: "/employees",
        },
      ],
    },
    {
      title: "Support",
      icon: "bi-question-circle-fill",
      path: "/support",
    },
    {
      title: "Help Center",
      icon: "bi-question-diamond-fill",
      path: "/help-center",
    },
    {
      title: "Feedback",
      icon: "bi-chat-dots-fill",
      path: "/feedback",
    },
    {
      title: "Privacy",
      icon: "bi-shield-lock-fill",
      path: "/privacy",
    },
    {
      title: "Logout",
      icon: "bi-box-arrow-right",
      path: "/logout",
    }
    // Add more menu items here...
  ];

  export default sideBarData;
  