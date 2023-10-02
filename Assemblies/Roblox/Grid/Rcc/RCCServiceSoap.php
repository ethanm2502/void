<?php

namespace Roblox\Grid\Rcc;

class RCCServiceSoap
{
    private $SoapClient;
    private $classmap = [
        "Status" => Status::class,
        "Job" => Job::class,
        "ScriptExecution" => ScriptExecution::class,
        "LuaValue" => LuaValue::class,
        "LuaType" => LuaType::class
    ];
    public $ip;
    public $port;
    public $url;

    public function __construct($url = "127.0.0.1", $port = 64989)
    {
        $this->ip = $url;
        $this->port = $port;
        $this->url = $url . $port;
        $this->SoapClient = new \SoapClient(__DIR__ . "/RCCService.wsdl", [
            "location" => "http://" . $url . ":" . $port,
            "uri" => "http://voidrev.us/",
            "classmap" => $this->classmap,
            "exceptions" => true
        ]);
    }

    public function callToService($name, $arguments = [])
    {
        $result = $this->SoapClient->{$name}($arguments);
        return (!is_soap_fault($result) ? ($result->{$name . "Result"} ?? null) : $result);
    }

    private static function parseJobResult($value)
    {
        if ($value !== new \stdClass() && isset($value->LuaValue)) {
            return LuaValue::deserializeValue($value->LuaValue);
        } else {
            return null;
        }
    }

    public function HelloWorld()
    {
        return $this->callToService(__FUNCTION__);
    }

    public function GetVersion()
    {
        return $this->callToService(__FUNCTION__);
    }

    public function OpenJob($job, $script = null)
    {
        return $this->OpenJobEx($job, $script);
    }

    public function OpenJobEx($job, $script = null)
    {
        $result = $this->callToService(__FUNCTION__, ["job" => $job, "script" => $script]);
        return self::parseJobResult($result);
    }

    public function BatchJob($job, $script)
    {
        return $this->BatchJobEx($job, $script);
    }

    public function BatchJobEx($job, $script)
    {
        $result = $this->callToService(__FUNCTION__, ["job" => $job, "script" => $script]);
        return self::parseJobResult($result);
    }

    public function RenewLease($jobID, $expirationInSeconds)
    {
        return $this->callToService(__FUNCTION__, ["jobID" => $jobID, "expirationInSeconds" => $expirationInSeconds]);
    }

    public function Execute($jobID, $script)
    {
        return $this->ExecuteEx($jobID, $script);
    }

    public function ExecuteEx($jobID, $script)
    {
        return $this->callToService(__FUNCTION__, ["jobID" => $jobID, "script" => $script]);
    }

    public function CloseJob($jobID)
    {
        return $this->callToService(__FUNCTION__, ["jobID" => $jobID]);
    }

    public function GetExpiration($jobID)
    {
        return $this->callToService(__FUNCTION__, ["jobID" => $jobID]);
    }

    public function Diag($type, $jobID)
    {
        return $this->DiagEx($type, $jobID);
    }

    public function DiagEx($type, $jobID)
    {
        return $this->callToService(__FUNCTION__, ["type" => $type, "jobID" => $jobID]);
    }

    public function GetStatus()
    {
        return $this->callToService(__FUNCTION__);
    }

    public function GetAllJobs()
    {
        return $this->GetAllJobsEx();
    }

    public function GetAllJobsEx()
    {
        return $this->callToService(__FUNCTION__);
    }

    public function CloseExpiredJobs()
    {
        return $this->callToService(__FUNCTION__);
    }

    public function CloseAllJobs()
    {
        return $this->callToService(__FUNCTION__);
    }
}
