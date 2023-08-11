// import { atom } from "jotai";
// import { IModuleData } from "../../app/workspace/workflow/components/ui/timeline/components/module";
// import {
//   SequenceBox,
//   TimeBoxProps,
// } from "../../app/workspace/workflow/components/ui/timeline/components/sequence";
// import { main_ui_blob } from "../../public/image_blob";

// const notificationContent = [
//   {
//     type: "doc",
//     content: [
//       {
//         type: "heading",
//         attrs: { level: 2 },
//         content: [
//           {
//             type: "text",
//             marks: [
//               { type: "bold" },
//               { type: "textStyle", attrs: { color: "#de5d00" } },
//             ],
//             text: "사전 온보딩 안내",
//           },
//         ],
//       },
//       {
//         type: "heading",
//         attrs: { level: 3 },
//         content: [
//           {
//             type: "text",
//             marks: [
//               { type: "bold" },
//               { type: "textStyle", attrs: { color: "#000000" } },
//             ],
//             text: "안녕하세요. 사전 온보딩 과정이 시작되었습니다.",
//           },
//         ],
//       },
//       {
//         type: "paragraph",
//         content: [
//           {
//             type: "text",
//             text: "신입사원 여러분들을 환영합니다! 온보딩 프로세스를 통해 RIDEAT의 가치와 문화를 익히시기 바랍니다. 새로운 도전에 함께해봅시다!",
//           },
//         ],
//       },
//       {
//         type: "heading",
//         attrs: { level: 3 },
//         content: [
//           {
//             type: "text",
//             marks: [
//               { type: "bold" },
//               { type: "textStyle", attrs: { color: "#000000" } },
//             ],
//             text: "신입사원 여러분, 환영합니다!",
//           },
//         ],
//       },
//       {
//         type: "paragraph",
//         content: [
//           {
//             type: "text",
//             text: "RIDEAT의 새로운 가족으로 합류하신 것을 축하드립니다. 저희와 함께 성장하는 멋진 시간이 되길 기대합니다.",
//           },
//         ],
//       },
//       {
//         type: "paragraph",
//         content: [
//           {
//             type: "text",
//             text: "RIDEAT HR 팀 리드 강민혁 드림",
//           },
//         ],
//       },
//       {
//         type: "paragraph",
//       },
//     ],
//   },
// ];

// const introductionContent = [
//   {
//     type: "doc",
//     content: [
//       {
//         type: "doc",
//         content: [
//           {
//             type: "heading",
//             attrs: { level: 2 },
//             content: [
//               {
//                 type: "text",
//                 marks: [
//                   { type: "bold" },
//                   { type: "textStyle", attrs: { color: "#9000b0" } },
//                 ],
//                 text: "RIDEAT 팀 소개",
//               },
//             ],
//           },
//           {
//             type: "image",
//             attrs: {
//               src: main_ui_blob,
//               alt: null,
//               title: null,
//             },
//           },
//           {
//             type: "paragraph",
//             content: [
//               {
//                 type: "text",
//                 text: "RIDEAT는 B2B SaaS 사업을 영위하며, 온보딩 프로세스를 효율화하는 서비스를 제공합니다. 이 서비스를 통해 기업들은 신입사원 교육 과정을 보다 원활하게 진행할 수 있습니다.",
//               },
//             ],
//           },
//           {
//             type: "heading",
//             attrs: { level: 3 },
//             content: [
//               {
//                 type: "text",
//                 marks: [{ type: "bold" }, { type: "textStyle" }],
//                 text: "주요 기능",
//               },
//             ],
//           },
//           {
//             type: "orderedList",
//             attrs: { tight: true, start: 1 },
//             content: [
//               {
//                 type: "listItem",
//                 content: [
//                   {
//                     type: "paragraph",
//                     content: [
//                       { type: "text", text: "효율적인 온보딩 프로세스 관리" },
//                     ],
//                   },
//                 ],
//               },
//               {
//                 type: "listItem",
//                 content: [
//                   {
//                     type: "paragraph",
//                     content: [{ type: "text", text: "다양한 교육 자료 제공" }],
//                   },
//                 ],
//               },
//               {
//                 type: "listItem",
//                 content: [
//                   {
//                     type: "paragraph",
//                     content: [
//                       {
//                         type: "text",
//                         text: "신입사원의 성장을 돕는 지원 시스템",
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             type: "heading",
//             attrs: { level: 3 },
//             content: [
//               {
//                 type: "text",
//                 marks: [{ type: "bold" }, { type: "textStyle" }],
//                 text: "더 알아보기",
//               },
//             ],
//           },
//           {
//             type: "taskList",
//             content: [
//               {
//                 type: "taskItem",
//                 attrs: { checked: false },
//                 content: [
//                   {
//                     type: "paragraph",
//                     content: [
//                       { type: "text", text: " RIDEAT의 " },
//                       {
//                         type: "text",
//                         marks: [
//                           {
//                             type: "link",
//                             attrs: {
//                               href: "https://www.rideat.com",
//                               target: "_blank",
//                               class:
//                                 "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
//                             },
//                           },
//                         ],
//                         text: "웹사이트",
//                       },
//                       { type: "text", text: "를 방문해 보세요." },
//                     ],
//                   },
//                 ],
//               },
//               {
//                 type: "taskItem",
//                 attrs: { checked: false },
//                 content: [
//                   {
//                     type: "paragraph",
//                     content: [
//                       { type: "text", text: " 자세한 정보를 위해 " },
//                       {
//                         type: "text",
//                         marks: [
//                           {
//                             type: "link",
//                             attrs: {
//                               href: "mailto:support@rideat.com",
//                               target: "_blank",
//                               class:
//                                 "text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
//                             },
//                           },
//                         ],
//                         text: "support@rideat.com",
//                       },
//                       { type: "text", text: "로 문의해 주세요." },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           },
//           { type: "paragraph" },
//         ],
//       },
//     ],
//   },
// ];

// const finishedContent = [
//   {
//     type: "doc",
//     content: [
//       {
//         type: "heading",
//         attrs: { level: 3 },
//         content: [
//           {
//             type: "text",
//             marks: [
//               { type: "bold" },
//               { type: "textStyle", attrs: { color: "#000000" } },
//             ],
//             text: "축하합니다. 시퀀스를 모두 수행하셨습니다.",
//           },
//         ],
//       },
//       {
//         type: "paragraph",
//         content: [
//           {
//             type: "text",
//             text: "시퀀스 과정에서 어려운 점이나 궁금한 점이 있으시면 HR팀에 문의해 주세요.",
//           },
//         ],
//       },
//       {
//         type: "paragraph",
//         content: [
//           {
//             type: "text",
//             text: "RIDEAT HR 팀 리드 강민혁 드림",
//           },
//         ],
//       },
//     ],
//   },
// ];

// const sequenceData: IModuleData[] = [
//   {
//     id: "1",
//     type: "notification",
//     title: "안내 메시지 전송",
//     contents: notificationContent,
//   },
//   {
//     id: "2",
//     type: "text",
//     title: "회사 소개",
//     contents: introductionContent,
//   },
//   {
//     id: "3",
//     type: "form",
//     title: "설문",
//     contents: [],
//   },
//   {
//     id: "4",
//     type: "quiz",
//     title: "퀴즈",
//     contents: [],
//   },
//   {
//     id: "5",
//     type: "video",
//     title: "비디오",
//     contents: [],
//   },
//   {
//     id: "6",
//     type: "finished",
//     title: "👍 Done!",
//     contents: finishedContent,
//   },

//   // and so on...
// ];

// const timelineData: TimeBoxProps[] = [
//   {
//     date: "-10",
//     employeeSequence: (
//       <SequenceBox
//         title="환영합니다! 😆"
//         stakeholder="employee"
//         sequenceData={sequenceData}
//       />
//     ),
//   },
//   {
//     date: "-9",
//     managerSequence: (
//       <SequenceBox
//         title="동료에게 미리 인사하기 👋"
//         stakeholder="manager"
//         sequenceData={sequenceData}
//       />
//     ),
//   },
//   {
//     date: "-3",
//     employeeSequence: (
//       <SequenceBox
//         title="필수 제출 서류 안내 📝"
//         stakeholder="employee"
//         sequenceData={sequenceData}
//       />
//     ),
//   },
//   {
//     date: "-0",
//     employeeSequence: (
//       <SequenceBox
//         title="입사일 D-Day 🎉"
//         stakeholder="employee"
//         sequenceData={sequenceData}
//       />
//     ),
//     managerSequence: (
//       <SequenceBox
//         title="신규사원 입사 환영 👏"
//         stakeholder="manager"
//         sequenceData={sequenceData}
//       />
//     ),
//   },
//   {
//     date: "+1",
//     managerSequence: (
//       <SequenceBox
//         title="사수 배정 🤝"
//         stakeholder="buddy"
//         sequenceData={sequenceData}
//       />
//     ),
//   },
//   {
//     date: "+2",
//     employeeSequence: (
//       <SequenceBox
//         title="신입사원 필수 교육 📚"
//         stakeholder="employee"
//         sequenceData={sequenceData}
//       />
//     ),
//     managerSequence: (
//       <SequenceBox
//         title="신입사원 교육 관리 📊"
//         stakeholder="manager"
//         sequenceData={sequenceData}
//       />
//     ),
//   },
//   {
//     date: "+6",
//     employeeSequence: (
//       <SequenceBox
//         title="신입사원 선택 교육 📚"
//         stakeholder="employee"
//         sequenceData={sequenceData}
//       />
//     ),
//   },
//   {
//     date: "+7",
//     employeeSequence: (
//       <SequenceBox
//         title="버디와 1:1 미팅 🤝"
//         stakeholder="employee"
//         sequenceData={sequenceData}
//       />
//     ),
//     managerSequence: (
//       <SequenceBox
//         title="멘티와 1:1 미팅 🤝"
//         stakeholder="buddy"
//         sequenceData={sequenceData}
//       />
//     ),
//   },
// ];

// export const timelineDataAtom = atom<TimeBoxProps[]>(timelineData);
