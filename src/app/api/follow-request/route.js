import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import dbConnect from "@/config/dbConnect";

dbConnect();

export async function PUT(req) {
  const body = await req.json();
  const { accepted, friendId } = body;
  try {
    const userId = await verifyToken(req);

    const user = await User.findById(userId);
    if (!user)
      return NextResponse.json(
        {
          success: false,
          message: "user not found",
        },
        {
          status: 400,
        }
      );

    const friend = await User.findById(friendId);
    if (!friend)
      return NextResponse.json(
        {
          success: false,
          message: "user not found",
        },
        {
          status: 400,
        }
      );

    if (accepted) {
      if (!user.followers.includes(friend._id)) {
        user.followers.push(friend._id);
        friend.following.push(user._id);
        user.notifications = user.notifications.filter(
          (notification) =>
            notification.userId.toString() !== friendId.toString() ||
            notification.type !== "request"
        );
        friend.pendingRequest = friend.pendingRequest.filter(
          (pendingRequestId) =>
            pendingRequestId.toString() !== user._id.toString()
        );
        await friend.save();
        await user.save();
        return NextResponse.json(
          {
            success: true,
            friend,
            user,
            message: "accepted",
          },
          {
            status: 200,
          }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "already in users followers",
            friend,
            user,
          },
          {
            status: 400,
          }
        );
      }
    } else {
      user.notifications = user.notifications.filter(
        (notification) =>
          notification.userId.toString() !== friendId.toString() ||
          notification.type !== "request"
      );
      friend.pendingRequest = friend.pendingRequest.filter(
        (pendingRequestId) =>
          pendingRequestId.toString() !== user._id.toString()
      );

      await friend.save();
      await user.save();

      return NextResponse.json(
        {
          success: true,
          message: "rejected",
          friend,
          user,
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    if (error.message === "jwt expired") {
      const response = NextResponse.json(
        { message: error.message },
        { status: 401 }
      );

      response.cookies.delete("token");

      return response;
    }
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

// import { verifyToken } from "@/helpers/verifyToken";
// import User from "@/models/userModel";
// import { NextResponse } from "next/server";
// import dbConnect from "@/config/dbConnect";

// dbConnect();

// export async function PUT(req) {
//   const body = await req.json();
//   const { accepted, friendId } = body;
//   try {
//     const userId = await verifyToken(req);

//     const user = await User.findById(userId);
//     if (!user)
//       return NextResponse.json(
//         {
//           success: false,
//           message: "user not found",
//         },
//         {
//           status: 400,
//         }
//       );

//     const friend = await User.findById(friendId);
//     if (!friend)
//       return NextResponse.json(
//         {
//           success: false,
//           message: "user not found",
//         },
//         {
//           status: 400,
//         }
//       );

//     if (accepted) {
//       if (friend.following.includes(user._id)) {
//         user.followers = user.followers.filter(
//           (followingId) => followingId.toString() !== user._id.toString()
//         );

//         await user.save();
//         friend.following = friend.following.filter(
//           (followingId) => followingId.toString() !== friend._id.toString()
//         );

//         await friend.save();
//       } else {
//         user.followers.push(user._id);
//         friend.following.push(friend._id);
//         await friend.save();
//         await user.save();
//       }
//     } else {
//       user.notifications = user.notifications.filter(
//         (notification) =>
//           notification.userId.toString() !== userId.toString() ||
//           notification.type !== "request"
//       );
//       await user.save();
//       //remove from friend pending list
//     }
//     return NextResponse.json(
//       {
//         success: true,
//         friend,
//         user,
//       },
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     if (error.message === "jwt expired") {
//       const response = NextResponse.json(
//         { message: error.message },
//         { status: 401 }
//       );

//       response.cookies.delete("token");

//       return response;
//     }
//     return NextResponse.json({ message: error.message }, { status: 400 });
//   }
// }
