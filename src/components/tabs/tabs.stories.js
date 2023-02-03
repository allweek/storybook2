import Tabs from "./tabs";
import Tab from "./tab";


export default {
    component: Tabs
};

const Template = (args) => ({
    components: { Tabs, Tab },
    setup() {
        return { args };
    },
    template: `
      <Tabs container-class="nav-tabs" title="TABS TITLE">
          <Tab
            :index="0"
            title="TOP WINNERS"
            className="nav-tabs-item_link"
          >
            Tab1 text
          </Tab>
          <Tab
            :index="1"
            title="LATEST WINNERS"
            className="nav-tabs-item_link"
          >
            Tab2 sdfafsadfasdfasdf
          </Tab>
      </Tabs>

    `
});

export const Default = Template.bind({});
