const DEFAULT_EDITOR_CONTENT = {
  type: "doc",
  content: [
    {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              marks: [
                { type: "bold" },
                { type: "textStyle", attrs: { color: "#008A00" } },
              ],
              text: "RIDEAT 팀 소개",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "RIDEAT는 B2B SaaS 사업을 영위하며, 온보딩 프로세스를 효율화하는 서비스를 제공합니다. 이 서비스를 통해 기업들은 신입사원 교육 과정을 보다 원활하게 진행할 수 있습니다.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [
            {
              type: "text",
              marks: [
                { type: "bold" },
                { type: "textStyle", attrs: { color: "#2563EB" } },
              ],
              text: "주요 기능",
            },
          ],
        },
        {
          type: "orderedList",
          attrs: { tight: true, start: 1 },
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    { type: "text", text: "효율적인 온보딩 프로세스 관리" },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "다양한 교육 자료 제공" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "신입사원의 성장을 돕는 지원 시스템",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [
            {
              type: "text",
              marks: [
                { type: "bold" },
                { type: "textStyle", attrs: { color: "#EAB308" } },
              ],
              text: "더 알아보기",
            },
          ],
        },
        {
          type: "taskList",
          content: [
            {
              type: "taskItem",
              attrs: { checked: false },
              content: [
                {
                  type: "paragraph",
                  content: [
                    { type: "text", text: " RIDEAT의 " },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "link",
                          attrs: {
                            href: "https://www.rideat.com",
                            target: "_blank",
                            class:
                              "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
                          },
                        },
                      ],
                      text: "웹사이트",
                    },
                    { type: "text", text: "를 방문해 보세요." },
                  ],
                },
              ],
            },
            {
              type: "taskItem",
              attrs: { checked: false },
              content: [
                {
                  type: "paragraph",
                  content: [
                    { type: "text", text: " 자세한 정보를 위해 " },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "link",
                          attrs: {
                            href: "mailto:support@rideat.com",
                            target: "_blank",
                            class:
                              "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
                          },
                        },
                      ],
                      text: "support@rideat.com",
                    },
                    { type: "text", text: "로 문의해 주세요." },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default DEFAULT_EDITOR_CONTENT;
