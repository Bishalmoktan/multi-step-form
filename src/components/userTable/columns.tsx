import { ColumnDef } from "@tanstack/react-table";
import { ICompleteDetails } from "../app-provider";
import { format } from "date-fns";
import DeleteButton from "./delete-button";
import UpdateUser from "./update-user";

export const columns: ColumnDef<ICompleteDetails>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { profileDetails, personalDetails } = row.original;
      return (
        <div className="flex gap-2 items-center">
          <div>
            <img
              src={profileDetails.img}
              alt={personalDetails.name}
              className="size-12 object-cover rounded-full"
            />
          </div>
          <div>
            <p>{personalDetails.name}</p>
            <p className="text-sm text-muted-foreground">
              {personalDetails.email}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const { personalDetails } = row.original;
      return <div>{personalDetails.phone}</div>;
    },
  },
  {
    accessorKey: "dob",
    header: "Date of birth",
    cell: ({ row }) => {
      const { personalDetails } = row.original;
      return <div>{format(personalDetails.dateOfBirth, "do MMM yyyy")}</div>;
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const { addressDetails } = row.original;
      return (
        <div>
          <div>
            {addressDetails.city}, {addressDetails.district}
          </div>
          <div>
            {addressDetails.state}, {addressDetails.country}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className="space-y-2">
          <DeleteButton id={id} />
          <UpdateUser id={id} />
        </div>
      );
    },
  },
];
