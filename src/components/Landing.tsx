import { useAppContext } from "./app-provider"
import MultiStepForm from "./multi-step-form/MultiStepForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { columns } from "./userTable/columns";
import { DataTable } from "./userTable/data-table";

const Landing = () => {
  const {detailsList} = useAppContext();
  return (
    <Tabs defaultValue="form">
    <TabsList>
      <TabsTrigger value="form">Form</TabsTrigger>
      <TabsTrigger value="table">Table</TabsTrigger>
    </TabsList>
    <TabsContent value="form">
        <MultiStepForm />
    </TabsContent>
    <TabsContent value="table">
      <DataTable data={detailsList} columns={columns} />
    </TabsContent>
  </Tabs>
  
  )
}
export default Landing