<?php
// This file defines the Job class.
namespace Roblox\Grid\Rcc;
class Job {
public $id;
public $expirationInSeconds;
public $category;
public $cores;
function __construct($id, $expirationInSeconds = 10, $category = 0, $cores = 1) {
$this->id = $id;
$this->expirationInSeconds = $expirationInSeconds;
$this->category = $category;
$this->cores = $cores;
}
}
// EOF