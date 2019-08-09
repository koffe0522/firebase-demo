const firebase = require("@firebase/testing");
const fs = require("fs");

/*
 * ============
 *    Setup
 * ============
 */
const projectId = "test-env-app-beb8e";
const rules = fs.readFileSync("../firestore.rules", "utf8");

/*
 * ============
 *  Test Cases
 * ============
 */
describe("firestore-test", () => {
    // はじめに１度ルールを読み込ませる
    beforeAll(
      async () => {
        await firebase.loadFirestoreRules({
          projectId,
          rules
        });
      }
    );
  
    // test毎にデータをクリアする
    afterEach(
      async () => {
        await firebase.clearFirestoreData({ projectId });
      }
    );
  
    // 全テスト終了後に作成したアプリを全消去
    afterAll(
      async () => {
        await Promise.all(
          firebase.apps().map((app) => app.delete())
        );
      }
    );
  
    function authedApp(auth) {
      return firebase.initializeTestApp({ projectId, auth }).firestore();
    }

    describe("messageコレクションのテスト", () => {
        test("messageの読み込みを実行", async () => {
          const db = authedApp({ uid: "testUser" });
          const message = db.collection("message").doc("testUser");
          await firebase.assertSucceeds(message.get());
        });
    
        test("messageへ書き込みを実行", async () => {
          const db = authedApp({ uid: "testUser" });
          const message = db.collection("message").doc("testUser");
          await firebase.assertSucceeds(
            message.set({text: "test"})
          );
        });
    });
})