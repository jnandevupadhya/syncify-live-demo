<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Plus, Check, X, MoreVertical } from "lucide-react";
import { toast } from "@/hooks/use-toast";
=======
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
>>>>>>> 907dadf95df5dadbb9d0428b746b9a375c198d8f
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

<<<<<<< HEAD
interface UserRequest {
  id: number;
  username: string;
  isRemoving: boolean;
  isAdding?: boolean;
  disabled: boolean;
  key?: string;
}

interface AcceptedUser {
  id: number;
  username: string;
  isRemoving: boolean;
  isAdding?: boolean;
  disabled: boolean;
  key?: string;
}

interface Room {
  name: string;
  id: number;
  text: string;
=======
interface User {
  id: string;
  name: string;
  disabled: boolean;
}

interface JoinRequest {
  id: string;
  name: string;
>>>>>>> 907dadf95df5dadbb9d0428b746b9a375c198d8f
}

export const Step4 = () => {
  const [requests, setRequests] = useState<UserRequest[]>([]);
  const [acceptedUsers, setAcceptedUsers] = useState<AcceptedUser[]>([]);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    // 1️⃣ Fetch room data
    const fetchRoom = async () => {
      const room = await fetch("http://localhost:8000/api/room/");
      const data = await room.json();
      setRoom((prev) => ({ ...prev, id: data.data.room_id }));
      console.log(data);
    };
    fetchRoom();

    // 2️⃣ Connect WebSocket for join requests
    const ws = new WebSocket("ws://127.0.0.1:8000/api/ws"); //websocket

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === "rehydrate") {
        console.log("rehydrating:", msg.requests);
        // populate pending requests
        setRequests(
          (msg.requests ?? []).map((user, idx) => ({
            id: idx,
            username: user.name ?? "Unknown",
            key: user.key ?? "",
            isAdding: false,
            isRemoving: false,
            disabled: false,
          })) as UserRequest[]
        );
        console.log(requests);

        // populate allowed users
        setAcceptedUsers(
          (msg.allowed ?? []).map((user, idx) => ({
            id: idx,
            username: user.name ?? "Unknown",
            key: user.key ?? "",
            isAdding: false,
            isRemoving: false,
            disabled: false,
          })) as AcceptedUser[]
        );
      }

      if (msg.type === "new_request") {
        const user = msg.user;

        setNextId((prevId) => {
          const newRequest: UserRequest = {
            id: prevId,
            username: user.name,
            key: user.key,
            isAdding: true,
            isRemoving: false,
            disabled: false,
          };

          setRequests((prevRequests) => [...prevRequests, newRequest]);

          setTimeout(() => {
            setRequests((prev) =>
              prev.map((req) =>
                req.id === newRequest.id ? { ...req, isAdding: false } : req
              )
            );

            // Toast after state updates
            toast({
              title: "Request Added",
              description: `${user.name} added to queue`,
              duration: 1000,
            });
          }, 50);

          return prevId + 1;
        });
      }
    };
  }, []);

  const [room, setRoom] = useState<Room>({
    name: "",
    id: 0,
    text: "roooom ID:",
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLInputElement>(null);

  const [roomVisible, setRoomVisible] = useState(false);

  useEffect(() => {
    const roomName = localStorage.getItem("roomName")?.trim();
    if (roomName && roomName != "") {
      setRoom((prev) => ({ ...prev, name: roomName }));
    } else {
      setRoom((prev) => ({ ...prev, name: "SpotiSync Control Panel" }));
    }

    const roomText = localStorage.getItem("roomText")?.trim();
    if (roomText && roomText != "") {
      setRoom((prev) => ({ ...prev, text: roomText }));
    } else {
      setRoom((prev) => ({ ...prev, text: "rooom ID:" }));
    }

    setTimeout(() => {
      setRoomVisible(true);
    }, 1000);
    // Focus the input
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem("roomName", room.name);
      localStorage.setItem("roomText", room.text);
    }, 1000);

    const timeout = setTimeout(() => {
      if (inputRef.current.value.trim() == "")
        inputRef.current.value = "SpotiSync control panel";
      if (textRef.current.value.trim() == "") {
        textRef.current.size = "roooom ID:".length;
        textRef.current.value = "roooom ID:";
      }
    }, 5000);

    return () => {
      clearTimeout(handler);
      clearTimeout(timeout);
    };
  }, [room]);

  const [confettiPieces, setConfettiPieces] = useState<
    Array<{ id: number; left: number; delay: number; emoji: string }>
  >([]);
<<<<<<< HEAD
=======
  const [showDiv, setShowDiv] = useState(true);
  const [showQueues, setShowQueues] = useState(false);
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "User 1", disabled: false },
    { id: "2", name: "User 2", disabled: false },
  ]);
  const [requests, setRequests] = useState<JoinRequest[]>([
    { id: "r1", name: "Join Request 1" },
  ]);
>>>>>>> 907dadf95df5dadbb9d0428b746b9a375c198d8f

  useEffect(() => {
    setShowDiv(true);
    // Generate confetti pieces
    const pieces = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      emoji: ["🎉", "🎊", "✨", "🌟", "💫"][Math.floor(Math.random() * 5)],
    }));
    setConfettiPieces(pieces);

    setTimeout(() => {
      setShowDiv(false);
    }, 3000);

    setTimeout(() => {
      setShowQueues(true);
    }, 2000);
  }, []);

<<<<<<< HEAD
  const [showDiv, setShowDiv] = useState(true);
  const [showQueues, setShowQueues] = useState(false);

  const addRequest = (user: { name: string; key: string }) => {
    const newRequest: UserRequest = {
      id: nextId,
      username: user.name,
      key: user.key, // ← store the key here
      isAdding: true,
      isRemoving: false,
      disabled: false,
    };

    setRequests([...requests, newRequest]);
    setNextId(nextId + 1);

    setTimeout(() => {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === newRequest.id ? { ...req, isAdding: false } : req
        )
      );
    }, 50);
    toast({
      title: "Request Added",
      description: `${newRequest.username} added to queue`,
      duration: 1000,
    });
  };

  const acceptRequest = async (id: number) => {
    const request = requests.find((req) => req.id === id);
    if (!request || !request.key) return; // make sure key exists

    try {
      // Call backend to allow this user
      await fetch("http://localhost:8000/api/set-scope", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-key": request.key, // send key to identify user
        },
        body: JSON.stringify({ action: "accept" }),
      });

      // Local UI updates
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, isRemoving: true } : req))
      );

      setTimeout(() => {
        setRequests((prev) => prev.filter((req) => req.id !== id));

        const newUser: AcceptedUser = {
          id: request.id,
          username: request.username,
          key: request.key, // keep key for future actions
          isRemoving: false,
          isAdding: true,
          disabled: false,
        };
        setAcceptedUsers((prev) => [...prev, newUser]);

        setTimeout(() => {
          setAcceptedUsers((prev) =>
            prev.map((user) =>
              user.id === id ? { ...user, isAdding: false } : user
            )
          );
        }, 50);

        toast({
          title: "Request Accepted",
          description: `${request.username} has been accepted`,
          duration: 1000,
        });
      }, 500);
    } catch (err) {
      console.error("Failed to accept user:", err);
      toast({
        title: "Error",
        description: `Failed to accept ${request.username}`,
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const rejectRequest = async (id: number) => {
    const request = requests.find((req) => req.id === id);
    if (!request || !request.key) return; // make sure key exists

    try {
      // Call backend to reject this user
      await fetch("http://localhost:8000/api/set-scope", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-key": request.key, // send key to identify user
        },
        body: JSON.stringify({ action: "reject" }),
      });

      // Local UI updates
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, isRemoving: true } : req))
      );

      setTimeout(() => {
        setRequests((prev) => prev.filter((req) => req.id !== id));

        toast({
          title: "Request Rejected",
          description: `${request.username} has been rejected`,
          variant: "destructive",
          duration: 1000,
        });
      }, 500);
    } catch (err) {
      console.error("Failed to reject user:", err);
      toast({
        title: "Error",
        description: `Failed to reject ${request.username}`,
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const removeAcceptedUser = async (id: number) => {
    const user = acceptedUsers.find((u) => u.id === id);
    if (!user || !user.key) return;

    try {
      // Call backend to remove this user
      await fetch("http://localhost:8000/api/set-scope", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-key": user.key, // send key to identify user
        },
        body: JSON.stringify({ action: "remove" }),
      });

      // Local UI updates
      setAcceptedUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, isRemoving: true } : u))
      );

      setTimeout(() => {
        setAcceptedUsers((prev) => prev.filter((u) => u.id !== id));
        toast({
          title: "User Removed",
          description: `${user.username} has been removed`,
          duration: 1000,
        });
      }, 500);
    } catch (err) {
      console.error("Failed to remove user:", err);
      toast({
        title: "Error",
        description: `Failed to remove ${user.username}`,
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const toggleDisable = async (id: number) => {
    const user = acceptedUsers.find((u) => u.id === id);
    if (!user || !user.key) return;

    const action = user.disabled ? "enable" : "disable";

    try {
      // Tell backend to update scope
      await fetch("http://localhost:8000/api/set-scope", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-key": user.key,
        },
        body: JSON.stringify({ action }),
      });

      // Update local state
      setAcceptedUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, disabled: !u.disabled } : u))
      );

      toast({
        title: "User Updated",
        description: `${user.username} is now ${
          action === "disable" ? "disabled" : "enabled"
        }`,
        duration: 1000,
      });
    } catch (err) {
      console.error("Failed to toggle disable:", err);
      toast({
        title: "Error",
        description: `Failed to ${action} ${user.username}`,
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <div
      className="absolute inset-x-0 top-[234px] bottom-8 flex items-center overflow-visible justify-center w-full max-h-[calc(100vh-234px-2rem)]"
      style={{ height: "calc(100vh - 234px - 2rem)" }}
    >
      <div className="flex gap-12 w-full mx-auto slide-up-enter -translate-y-1/4">
        {/* Left Queue - Active Users */}
        <div
          className={`crafty absolute top-1/2 translate-x-1/4 -translate-y-1/2 w-1/4 max-w-sm z-10 transition-opacity duration-300 ${
            !showDiv ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border shadow-2xl min-h-[100px]">
            <h3 className="text-3xl text-center font-semibold text-primary mb-4">
              Accepted Users
            </h3>
            <div className="transition-all duration-300">
              <div
                className={`flex items-center justify-center text-center overflow-hidden transition-all duration-500 ${
                  acceptedUsers.length !== 0
                    ? "opacity-0 max-h-0"
                    : "opacity-100 max-h-[40px]"
                }`}
              >
                <p className="text-muted-foreground text-lg">
                  No accepted users yet
                </p>
              </div>

              {acceptedUsers.length > 0 &&
                acceptedUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`
                      transition-all duration-500 ease-in-out 
                      ${
                        user.disabled
                          ? "opacity-50 grayscale mt-4"
                          : user.isRemoving
                          ? "opacity-0 -translate-y-4 max-h-0 overflow-hidden mt-0"
                          : user.isAdding
                          ? "opacity-0 translate-y-4 max-h-0"
                          : "opacity-100 translate-y-0 max-h-[200px] mt-4"
                      }
                    `}
                  >
                    <div className="bg-secondary rounded-lg p-2 px-4 border border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-normal text-2xl">
                            {user.username}
                          </h3>
                          <p className="text-lg text-muted-foreground">
                            Active
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="crafty font-normal bg-background border-border z-50">
                            <DropdownMenuItem
                              onClick={() => toggleDisable(user.id)}
                              className="cursor-pointer text-[18px]"
                            >
                              {user.disabled
                                ? "Enable Control"
                                : "Disable Control"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => removeAcceptedUser(user.id)}
                              className="cursor-pointer font-normal text-[20px] text-red-500"
                            >
                              Remove User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
=======
  const removeUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const toggleDisable = (id: string) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, disabled: !user.disabled } : user
      )
    );
  };

  const acceptRequest = (id: string) => {
    const request = requests.find((req) => req.id === id);
    if (request) {
      setRequests(requests.filter((req) => req.id !== id));
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: request.name,
        disabled: false,
      };
      setUsers([...users, newUser]);
    }
  };

  const rejectRequest = (id: string) => {
    setRequests(requests.filter((req) => req.id !== id));
  };

  const addRequest = () => {
    const newRequest: JoinRequest = {
      id: `req-${Date.now()}`,
      name: `Join Request ${requests.length + 1}`,
    };
    setRequests([...requests, newRequest]);
  };

  return (
    <div className="flex gap-12 items-center w-full max-w-7xl mx-auto slide-up-enter">
      {/* Left Queue - Active Users */}
      <div
        className={`w-1/4 max-w-sm bg-neutral-900/80 rounded-xl p-4 transition-all duration-500 ease-in-out ${
          showQueues ? "opacity-100 max-h-[2000px]" : "opacity-0 max-h-0"
        }`}
      >
        <h3 className="text-lg font-semibold text-primary mb-3">
          🎵 Active Users
        </h3>
        <div className="space-y-2 mb-4">
          {users.map((user) => (
            <div
              key={user.id}
              className={`bg-card/50 border border-border rounded-lg p-3 transition-all duration-500 ease-in-out animate-fade-in ${
                user.disabled ? "opacity-50 grayscale" : "opacity-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{user.name}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                    >
                      <span className="text-lg">⋮</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background border-border z-50">
                    <DropdownMenuItem
                      onClick={() => toggleDisable(user.id)}
                      className="cursor-pointer"
                    >
                      {user.disabled ? "Enable Control" : "Disable Control"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => removeUser(user.id)}
                      className="cursor-pointer text-destructive"
                    >
                      Remove User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center Content - Main Step Card */}
      <div className="flex-1 text-center relative overflow-hidden">
        {/* Confetti Animation */}
        {confettiPieces.map((piece) => (
          <div
            key={piece.id}
            className="absolute text-2xl confetti pointer-events-none"
            style={{
              left: `${piece.left}%`,
              animationDelay: `${piece.delay}s`,
              top: "-20px",
            }}
          >
            {piece.emoji}
          </div>
        ))}

        <div className="relative z-10 step-card max-w-lg mx-auto">
          <div
            className={`flex flex-col justify-center transition-all duration-500 ease-in-out overflow-hidden ${
              showDiv ? "opacity-100 max-h-[500px] mb-8" : "opacity-0 max-h-0 mb-0"
            }`}
          >
            <div className="text-8xl mb-6 animate-bounce">🎉</div>

            <h2 className="text-4xl font-bold mb-4 text-success">ALL DONE!</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Your Spotify listen-along extension is ready to rock!
            </p>
>>>>>>> 907dadf95df5dadbb9d0428b746b9a375c198d8f
          </div>

<<<<<<< HEAD
        {/* Room name */}
        <div className="flex flex-col w-full items-center">
          <div
            className="flex left-1/2 z-10 w-full items-center -translate-y-3/4 flex-col transform text-center flex-1 overflow-hidden"
            style={{
              fontFamily: '"Quicksand", sans-serif',
              color: "hsl(142, 73%, 42%)",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={room.name}
              onChange={(e) =>
                setRoom((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="SpotiSync control panel"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              // disabled={acceptedUsers.length != 0}
              className={`jersey bg-transparent border-none outline-none text-4xl font-bold text-center transition-opacity duration-300 placeholder:text-muted-foreground ${
                roomVisible ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
          {/* Middle / Stepcard / Center Content - Main Step Card */}
          <div className="flex-1 text-center max-h-[365px] pt-0 relative overflow-visible">
            {/* Confetti Animation */}

            <div className="relative  step-card max-w-lg mx-auto max-h-[365px] overflow-hidden">
              {confettiPieces.map((piece) => (
                <div
                  key={piece.id}
                  className="absolute text-2xl confetti pointer-events-none"
                  style={{
                    left: `${piece.left}%`,
                    animationDelay: `${piece.delay}s`,
                    top: "-20px",
                  }}
                >
                  {piece.emoji}
                </div>
              ))}
              <div className="flex flex-col items-center justify-center text-center relative">
                <div
                  className={`flex flex-col justify-center transition-all duration-300 ease-in-out overflow-hidden ${
                    showDiv
                      ? "opacity-100 max-h-[500px] mb-8"
                      : "opacity-0 max-h-0 mb-0"
                  }`}
                >
                  <div className="text-7xl mt-4 mb-6 animate-bounce">🎉</div>

                  <h2 className="jersey text-4xl font-bold mb-4 text-success">
                    ALL DONE!
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Your Spotify listen-along extension is ready to rock!
                  </p>
                </div>
                <h2
                  className={`jersey flex flex-row pr-10 justify-center w-full transition-all duration-1000 items-center text-center text-3xl font-bold mb-4 text-success ${
                    showDiv
                      ? "opacity-0 absolute max-h-0"
                      : "opacity-70 max-h-[100px]"
                  }`}
                >
                  <input
                    type="text"
                    ref={textRef}
                    placeholder="roooom ID:"
                    size={
                      room.text.length == 0
                        ? "roooom ID:".length
                        : room.text.length
                    }
                    onChange={(e) =>
                      setRoom((prev) => ({ ...prev, text: e.target.value }))
                    }
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    disabled={showDiv}
                    // disabled={acceptedUsers.length != 0}
                    className={`bg-transparent border-none outline-none text-3xl font-bold text-center transition-opacity duration-300 placeholder:text-muted-foreground ${
                      roomVisible ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {room.id}
                </h2>
              </div>

              <div
                className={`bg-success/20 border border-success/30 rounded-2xl transition-all duration-500 ease-in-out overflow-hidden ${
                  !showDiv
                    ? "opacity-100 max-h-[200px] p-6"
                    : "opacity-0 max-h-0"
                }`}
              >
                <h3 className="jersey text-3xl font-semibold mb-3 flex items-center justify-center">
                  What's Next?
                </h3>
                <ul className="text-muted-foreground space-y-2 text-left">
                  <li className="flex items-start">
                    <span className="text-lg mr-2">👥</span>
                    <span>Share the extension file with your friends</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lg mr-2">💬</span>
                    <span>
                      Ask them to enter{" "}
                      <span className="text-success">{room.id}</span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lg mr-2">🎵</span>
                    <span>Enjoy synchronized music experiences</span>
                  </li>
                </ul>
              </div>

              <p
                className={`text-sm text-muted-foreground transition-all duration-500 ease-in-out overflow-hidden ${
                  !showDiv
                    ? "opacity-100 max-h-[500px] mt-6"
                    : "opacity-0 max-h-0 mt-0"
                }`}
              >
                Thanks for using our installer! Have fun listening together! 💚
              </p>
            </div>
          </div>
        </div>

        {/* Right Queue - Join Requests */}
        <div
          className={`  absolute right-0 top-1/2 -translate-x-1/4 -translate-y-1/2 w-1/4 max-w-sm z-10 transition-opacity duration-300 ${
            !showDiv ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="crafty bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border shadow-2xl min-h-[100px]">
            <h3 className="text-3xl text-center font-semibold text-primary mb-4">
              Join Requests
            </h3>
            <div className="">
              {requests.length === 0 ? (
                <div className="flex items-center justify-center text-center">
                  <p className="text-muted-foreground text-lg">
                    No requests in queue
                  </p>
                </div>
              ) : (
                requests.map((request) => (
                  <div
                    key={request.id}
                    className={`
    transition-all duration-500 ease-in-out 
    ${
      request.isRemoving
        ? "opacity-0 -translate-y-4 max-h-0 overflow-hidden"
        : request.isAdding
        ? "opacity-0 translate-y-4 max-h-0 mb-4"
        : "opacity-100 translate-y-0 max-h-[200px] mb-4"
    }
  `}
                  >
                    <div className="bg-secondary rounded-lg p-4 border border-border">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-normal text-2xl">
                            {request.username}
                          </h3>
                        </div>
                        <p className="text-lg text-muted-foreground">
                          Pending approval
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="flex-1 h-8 text-lg gap-1 bg-green-600 text-white hover:bg-green-700"
                            onClick={() => acceptRequest(request.id)}
                          >
                            <Check className="h-3 w-3" />
                            Accept
                          </Button>

                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex-1 h-8 text-lg gap-1"
                            onClick={() => rejectRequest(request.id)}
                          >
                            <X className="h-3 w-3" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="flex items-center mt-5 flex-col justify-center">
            {/* <Button size="sm" variant="outline" className="w-auto gap-2">
              <Plus className="h-4 w-4" />
              Add Request
            </Button> */}
          </div>
        </div>
=======
          <div
            className={`bg-success/20 border border-success/30 rounded-2xl p-6 transition-all duration-500 ease-in-out overflow-hidden ${
              !showDiv ? "opacity-100 max-h-[500px] mb-8" : "opacity-0 max-h-0 mb-0"
            }`}
          >
            <h3 className="text-xl font-semibold mb-3 flex items-center justify-center">
              🚀 What's Next?
            </h3>
            <ul className="text-muted-foreground space-y-2 text-left">
              <li className="flex items-start">
                <span className="text-lg mr-2">👥</span>
                <span>Share the extension file with your friends</span>
              </li>
              <li className="flex items-start">
                <span className="text-lg mr-2">🎵</span>
                <span>Start a listening party together</span>
              </li>
              <li className="flex items-start">
                <span className="text-lg mr-2">💬</span>
                <span>Enjoy synchronized music experiences</span>
              </li>
            </ul>
          </div>

          <p
            className={`text-sm text-muted-foreground transition-all duration-500 ease-in-out overflow-hidden ${
              !showDiv ? "opacity-100 max-h-[500px] mt-6" : "opacity-0 max-h-0 mt-0"
            }`}
          >
            Thanks for using our installer! Have fun listening together! 💚
          </p>
        </div>
      </div>

      {/* Right Queue - Join Requests */}
      <div
        className={`w-1/4 max-w-sm bg-neutral-900/80 rounded-xl p-4 transition-all duration-500 ease-in-out ${
          showQueues ? "opacity-100 max-h-[2000px]" : "opacity-0 max-h-0"
        }`}
      >
        <h3 className="text-lg font-semibold text-primary mb-3">
          📥 Join Requests
        </h3>
        <div className="space-y-2 mb-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-card/50 border border-border rounded-lg p-3 transition-all duration-500 ease-in-out animate-fade-in"
            >
              <div className="space-y-2">
                <span className="text-sm text-foreground block">
                  {request.name}
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="default"
                    className="flex-1 h-7 text-xs"
                    onClick={() => acceptRequest(request.id)}
                  >
                    ✅ Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex-1 h-7 text-xs"
                    onClick={() => rejectRequest(request.id)}
                  >
                    ❌ Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={addRequest}
        >
          + Add Request
        </Button>
>>>>>>> 907dadf95df5dadbb9d0428b746b9a375c198d8f
      </div>
    </div>
  );
};
