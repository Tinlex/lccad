<script>
  import { DatePicker } from "@svelte-plugins/datepicker"
  import Input from "../Input/Input.svelte"
  import { format } from "date-fns"

  let dateFormat = "MM/dd/yy"
  let isOpen = false

  export let handleDateChange
  export let value
  export let errorMessage = ""

  const toggleDatePicker = () => (isOpen = !isOpen)
</script>

<DatePicker bind:isOpen onDayClick={handleDateChange} theme="custom-datepicker">
  <Input
    variant="primary"
    placeholder="Date of Birth"
    value={value ? format(new Date(value), dateFormat) : ""}
    iconSrc={""}
    handleClick={toggleDatePicker}
    readonly={true}
    errorMsg={errorMessage}
    errorMsgAbsolute={true}
  />
</DatePicker>

<style>
  :global(.datepicker[data-picker-theme="custom-datepicker"]) {
    /* Date picker */
    --datepicker-calendar-header-year-nav-height: 20px;
    --datepicker-calendar-header-year-nav-line-height: 20px;
    --datepicker-calendar-header-year-nav-width: 20px;
    --datepicker-calendar-header-year-nav-icon-font-size: 20px;

    --datepicker-calendar-header-year-nav-icon-next-background-size: 20px 20px;
    --datepicker-calendar-header-year-nav-icon-next-height: 20px;
    --datepicker-calendar-header-year-nav-icon-next-width: 20px;

    --datepicker-calendar-header-year-nav-icon-prev-background-size: 20px 20px;
    --datepicker-calendar-header-year-nav-icon-prev-height: 20px;
    --datepicker-calendar-header-year-nav-icon-prev-width: 20px;
  }
</style>
