<?php
header("Content-Type: application/json");
$privatekey = "-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQDOirFwxWKEiVdFMlqqAaIofFcG31hIdEtnoC0tx0Ykx9BpoA3fbStwQfUUv7usn49qCgGh25OWrS88jkr6Y2tce663lLVVEV9pymS9APcoy4quVYn9/FbaDQh/bQGyPUR8AdUKaiA74dPI9w1yVp+uzOHAxHko7ou/9YK/+l3EtQIDAQABAoGAVX9yLmV2/7g+qQVMJJ3ie3HlMJIZ4HxLjozuxsl7ztPsAR1hQMDXP3P+OOWZkb7HRjT4MgFMGg58xEt+3CF1mid0UEmRxIezvrd2X5+muYckj/qOG1LHcYhWcHsp6vO5kejbHdjfY/DEpOGeLmuH6hF3HM+aD5boAgru9SDfgs0CQQDyGyVe1jc5iPZVOaw2n01uvQD59azdnUy2WAb/nB2M+87+vUMrQ7z8Iat+jwSz/EAoL06b4FmEjt30ynWsuRkvAkEA2mUPw0aCnpDMCQHkzp/ASAOiIwHiTzrnPcI2af71eylXTBofD43uFbZKEIq7o6eFng1YGRNDt8kHwiWqvET/WwJAaCo/0ObvycRg39g5fSLbKOsO0XzfTFZSXB3RnQZpPHBW5gk+Lg4t8Hj4FTKpflroq6F2+9/yA/OIEbtOF+tnpwJAOgpLsyDlC9D9eJNZRJRuHHVivJz+kQHdfKtFnMvWX4HwIlh60r5sfLayXk0QawDVYNi5Bgj5oTk655ztEBXiKwJBAILWgqOVjICo4dfmM5cjmrmFydTL9QPuytmCzGNDKY2VO+8xRUgVTpDWfaQ/tGj+AxdAlae1w71DARe6fWItR34=
-----END RSA PRIVATE KEY-----";
ob_start();
?>

-- Function to handle errors and display error messages using game:SetMessage()
local function handleErrors(success, ...)
    if not success then
        local errorMessage = ...
        game:SetMessage("Error: " .. errorMessage)
    end
    return success, ...
end

-- Start Game Script Arguments

------------------- UTILITY FUNCTIONS --------------------------

local cdnSuccess = 0
local cdnFailure = 0

function waitForChild(parent, childName)
  while true do
    local child = parent:findFirstChild(childName)
    if child then
      return child
    end
    parent.ChildAdded:wait()
  end
end

-- returns the player object that killed this humanoid
-- returns nil if the killer is no longer in the game
function getKillerOfHumanoidIfStillInGame(humanoid)

  -- check for kill tag on humanoid - may be more than one - todo: deal with this
  local tag = humanoid:findFirstChild("creator")

  -- find player with name on tag
  if tag then
    local killer = tag.Value
    if killer.Parent then -- killer still in game
      return killer
    end
  end

  return nil
end
-----------------------------------END UTILITY FUNCTIONS -------------------------

-----------------------------------"CUSTOM" SHARED CODE----------------------------------

settings().Network.PhysicsSend = Enum.PhysicsSendMethod.TopNErrors
settings().Network.ExperimentalPhysicsEnabled = true
settings().Network.WaitingForCharacterLogRate = 100
pcall(function() settings().Diagnostics:LegacyScriptMode() end)

-----------------------------------START GAME SHARED SCRIPT------------------------------

local success, errorMessage

-- Set custom flags and settings with error handling
success, errorMessage = handleErrors(pcall(function()
    settings().Network.UseInstancePacketCache = true
    settings().Network.UsePhysicsPacketCache = true
    settings()["Task Scheduler"].PriorityMethod = Enum.PriorityMethod.AccumulatedError
end))
if not success then
    game:SetMessage("Error in setting flags and settings: " .. errorMessage)
end

-- establish this peer as the Server
local ns = game:GetService("NetworkServer")

local badgeUrlFlagExists, badgeUrlFlagValue = pcall(function () return settings():GetFFlag("NewBadgeServiceUrlEnabled") end)
local newBadgeUrlEnabled = badgeUrlFlagExists and badgeUrlFlagValue
if url~=nil then
  local url = "http://www.voidrev.us/"

  pcall(function() game:GetService("Players"):SetAbuseReportUrl(url .. "/AbuseReport/InGameChatHandler.ashx") end)
  pcall(function() game:GetService("ScriptInformationProvider"):SetAssetUrl(url .. "/Asset/") end)
  pcall(function() game:GetService("ContentProvider"):SetBaseUrl(url .. "/") end)
  pcall(function() game:GetService("Players"):SetChatFilterUrl(url .. "/Game/ChatFilter.ashx") end)
  
  if gameCode then
    game:SetVIPServerId(tostring(gameCode))
  end

  game:GetService("BadgeService"):SetPlaceId(1)
  game:SetPlaceId(1)
  game:SetCreatorId(1)


  if newBadgeUrlEnabled then
    game:GetService("BadgeService"):SetAwardBadgeUrl(apiProxyUrl .. "/assets/award-badge?userId=%d&badgeId=%d&placeId=%d")
  end

  if access~=nil then
    if not newBadgeUrlEnabled then
      game:GetService("BadgeService"):SetAwardBadgeUrl(url .. "/Game/Badge/AwardBadge.ashx?UserID=%d&BadgeID=%d&PlaceID=%d&" .. access)
    end

    game:GetService("BadgeService"):SetHasBadgeUrl(url .. "/Game/Badge/HasBadge.ashx?UserID=%d&BadgeID=%d&" .. access)
    game:GetService("BadgeService"):SetIsBadgeDisabledUrl(url .. "/Game/Badge/IsBadgeDisabled.ashx?BadgeID=%d&PlaceID=%d&" .. access)

    game:GetService("FriendService"):SetMakeFriendUrl(url .. "/Game/CreateFriend?firstUserId=%d&secondUserId=%d")
    game:GetService("FriendService"):SetBreakFriendUrl(url .. "/Game/BreakFriend?firstUserId=%d&secondUserId=%d")
    game:GetService("FriendService"):SetGetFriendsUrl(url .. "/Game/AreFriends?userId=%d")
  end
  game:GetService("BadgeService"):SetIsBadgeLegalUrl("")
  game:GetService("InsertService"):SetBaseSetsUrl(url .. "/Game/Tools/InsertAsset.ashx?nsets=10&type=base")
  game:GetService("InsertService"):SetUserSetsUrl(url .. "/Game/Tools/InsertAsset.ashx?nsets=20&type=user&userid=%d")
  game:GetService("InsertService"):SetCollectionUrl(url .. "/Game/Tools/InsertAsset.ashx?sid=%d")
  game:GetService("InsertService"):SetAssetUrl(url .. "/Asset/?id=%d")
  game:GetService("InsertService"):SetAssetVersionUrl(url .. "/Asset/?assetversionid=%d")
  
  pcall(function() loadfile(url .. "/Game/LoadPlaceInfo.ashx?PlaceId=" .. placeId)() end)
  
  pcall(function() 
        if access then
          loadfile(url .. "/Game/PlaceSpecificScript.ashx?PlaceId=" .. placeId .. "&" .. access)()
        end
      end)
end

pcall(function() game:GetService("NetworkServer"):SetIsPlayerAuthenticationRequired(false) end)
settings().Diagnostics.LuaRamLimit = 0



if placeId~=nil and killID~=nil and deathID~=nil and url~=nil then
  -- listen for the death of a Player
  function createDeathMonitor(player)
    -- we don't need to clean up old monitors or connections since the Character will be destroyed soon
    if player.Character then
      local humanoid = waitForChild(player.Character, "Humanoid")
      humanoid.Died:connect(
        function ()
          onDied(player, humanoid)
        end
      )
    end
  end

  -- listen to all Players' Characters
  game:GetService("Players").ChildAdded:connect(
    function (player)
      createDeathMonitor(player)
      player.Changed:connect(
        function (property)
          if property=="Character" then
            createDeathMonitor(player)
          end
        end
      )
    end
  )
end

game:GetService("Players").PlayerAdded:connect(function(player)
  
  print("Player " .. player.userId .. " added")
  
  if url and access and placeId and player and player.userId then
    game:HttpGet(url .. "/Game/ClientPresence.ashx?action=connect&" .. access .. "&PlaceID=" .. placeId .. "&UserID=" .. player.userId)
    game:HttpPost(url .. "/Game/PlaceVisit.ashx?UserID=" .. player.userId .. "&AssociatedPlaceID=" .. placeId .. "&" .. access, "")
  end
end)


game:GetService("Players").PlayerRemoving:connect(function(player)
  print("Player " .. player.userId .. " leaving")  

  if url and access and placeId and player and player.userId then
    game:HttpGet(url .. "/Game/ClientPresence.ashx?action=disconnect&" .. access .. "&PlaceID=" .. placeId .. "&UserID=" .. player.userId)
  end
end)

-- Now start the connection
success, errorMessage = handleErrors(pcall(function()
    game:Load("rbxasset://temp.rbxl")
    ns:Start(53640, 20)  
end))
if not success then
    game:SetMessage("Error while starting the connection: " .. errorMessage)
end

-- StartGame --
Game:GetService("RunService"):Run()
game:SetMessage("Running on:"..ns.Port)
<?php
$data = "\r\n" . ob_get_clean();
openssl_sign($data, $sig, $privatekey, OPENSSL_ALGO_SHA1);
echo "--rbxsig%" . base64_encode($sig) . "%" . $data;
?>